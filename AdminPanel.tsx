import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Product, Brand, Category, PhoneSpec, BusinessHours } from '../types';
import { identifyDeviceFromImage } from '../services/geminiService';
import { 
  LogOut, Plus, Edit, Trash2, X, Save, ArrowLeft, 
  Image as ImageIcon, Upload, Sparkles, Loader2, 
  Smartphone, DollarSign, Clock, Calendar, CheckCircle2, AlertCircle, Terminal,
  Package, Award 
} from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

// Utility to resize and compress images to avoid localStorage overflow
const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                const maxSize = 800;
                let width = img.width;
                let height = img.height;
                
                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.7)); 
                } else {
                    reject(new Error("Canvas context failed"));
                }
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const { isAuthenticated, login, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, heroImages, addHeroImage, deleteHeroImage, businessHours, updateBusinessHours } = useData();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'hero' | 'hours'>('products');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempHours, setTempHours] = useState<BusinessHours>(businessHours);

  const initialSpec: PhoneSpec = { screen: '', processor: '', ram: '', storage: '', camera: '', battery: '', os: '' };
  const emptyProduct: Product = { id: '', name: '', brand: Brand.APPLE, category: Category.SMARTPHONES, price: 0, image: '', description: '', isNew: false, featured: false, specs: initialSpec };
  const [formData, setFormData] = useState<Product>(emptyProduct);

  const handleAiIdentify = async () => {
    if (!formData.image) return;
    setIsAiLoading(true);
    try {
      const result = await identifyDeviceFromImage(formData.image);
      if (result) {
        setFormData(prev => ({
          ...prev,
          name: result.name || prev.name,
          brand: (Object.values(Brand).find(b => b.toLowerCase() === result.brand?.toLowerCase()) as Brand) || prev.brand,
          description: result.description || prev.description,
          specs: { ...prev.specs, ...result.specs }
        }));
      }
    } catch (error) {
      alert("Erro na IA. Preencha manualmente.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(username, password)) {
      setLoginError('Credenciais inválidas. Verifique usuário e senha.');
    }
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditingProduct(null);
    setFormData({ ...emptyProduct, id: Date.now().toString() });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
        editingProduct ? updateProduct(formData) : addProduct(formData);
        setIsModalOpen(false);
    } catch (error) {
        alert("Erro ao salvar. A imagem pode ser muito grande.");
    }
  };

  const handleSaveHours = () => {
    updateBusinessHours(tempHours);
    alert('Cronograma de funcionamento atualizado com sucesso!');
  };

  const updateDay = (day: keyof BusinessHours, field: string, value: any) => {
    setTempHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  // Image handlers using processImage
  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        try {
            const resizedImage = await processImage(file);
            setFormData(prev => ({ ...prev, image: resizedImage }));
        } catch (error) {
            console.error("Error processing image", error);
            alert("Erro ao processar imagem.");
        }
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        try {
            const resizedImage = await processImage(file);
            addHeroImage({ id: Date.now().toString(), url: resizedImage });
        } catch (error) {
            console.error("Error processing image", error);
            alert("Erro ao processar imagem.");
        }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-white/5 w-full max-w-sm shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="bg-cyan-500/20 p-4 rounded-3xl border border-cyan-500/20">
               <Terminal className="text-cyan-400" size={32} />
            </div>
          </div>
          <h2 className="text-xl font-black text-center text-white mb-2 tracking-tighter uppercase">Acesso Restrito</h2>
          <p className="text-[10px] text-slate-500 text-center font-bold uppercase tracking-widest mb-8">Console de Gerenciamento Wk.Sitems</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-2">Identificador</label>
              <input type="text" placeholder="ADMIN_ID" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-5 py-4 bg-black border border-white/5 text-white rounded-2xl focus:border-cyan-500 outline-none text-xs font-bold uppercase tracking-widest" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-2">Chave de Segurança</label>
              <input type="password" placeholder="PASSPHRASE" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-5 py-4 bg-black border border-white/5 text-white rounded-2xl focus:border-cyan-500 outline-none text-xs font-bold uppercase tracking-widest" />
            </div>
            {loginError && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest bg-red-500/10 py-2 rounded-lg">{loginError}</p>}
            <button type="submit" className="w-full py-5 bg-white text-black font-black rounded-2xl transition-all uppercase text-[10px] tracking-widest shadow-xl active:scale-95 hover:bg-cyan-500 hover:text-white mt-4">Validar Acesso</button>
            <button type="button" onClick={onBack} className="w-full text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] py-4 hover:text-white transition-colors">Voltar para a Loja</button>
          </form>
        </div>
      </div>
    );
  }

  const daysLabels: Record<keyof BusinessHours, string> = {
    monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta', thursday: 'Quinta', friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo'
  };

  return (
    <div className="min-h-screen bg-black text-slate-200">
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-6">
             <button onClick={onBack} className="bg-white/5 p-3 rounded-xl text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></button>
             <h1 className="text-xs font-black text-white tracking-[0.3em] uppercase hidden sm:block">Wk.Sitems <span className="text-cyan-500">Master Console</span></h1>
          </div>
          <div className="flex gap-3">
            {activeTab === 'products' && (
                <button onClick={openAdd} className="bg-cyan-600 text-white px-6 py-3 rounded-xl font-black hover:bg-cyan-500 flex items-center gap-2 text-[10px] uppercase tracking-widest shadow-xl transition-all">
                    <Plus size={16} /> Adicionar Item
                </button>
            )}
            <button onClick={() => { logout(); onBack(); }} className="bg-red-500/10 text-red-500 p-3 rounded-xl hover:bg-red-500/20 transition-all border border-red-500/20"><LogOut size={20} /></button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex overflow-x-auto gap-3 mb-10 bg-slate-900/50 p-1.5 rounded-2xl w-fit border border-white/5 scrollbar-hide">
            {[
              { id: 'products', label: 'Estoque', icon: <Package size={14}/> },
              { id: 'hero', label: 'Banners', icon: <ImageIcon size={14}/> },
              { id: 'hours', label: 'Funcionamento', icon: <Clock size={14}/> }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)} 
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${activeTab === tab.id ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
        </div>

        {activeTab === 'hours' && (
           <div className="max-w-4xl animate-fade-in">
              <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Clock size={200} />
                 </div>
                 
                 <div className="relative z-10">
                    <div className="mb-10">
                       <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">Controle de <span className="text-cyan-500">Status</span></h2>
                       <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Gerencie os horários que ativam a bolha de status na loja</p>
                    </div>

                    <div className="space-y-3">
                       {(Object.keys(tempHours) as Array<keyof BusinessHours>).map((day) => (
                          <div key={day} className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-6 ${tempHours[day].isOpen ? 'bg-white/5 border-white/5' : 'bg-red-500/5 border-red-500/10'}`}>
                             <div className="flex items-center gap-4 w-full sm:w-1/3">
                                <div className={`w-3 h-3 rounded-full ${tempHours[day].isOpen ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500'}`}></div>
                                <span className="text-sm font-black text-white uppercase tracking-widest">{daysLabels[day]}</span>
                             </div>

                             <div className="flex items-center gap-4 w-full sm:w-1/2 justify-center sm:justify-end">
                                {tempHours[day].isOpen ? (
                                   <div className="flex items-center gap-3">
                                      <input 
                                        type="time" 
                                        value={tempHours[day].openTime} 
                                        onChange={(e) => updateDay(day, 'openTime', e.target.value)}
                                        className="bg-black border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-cyan-400 outline-none focus:border-cyan-500"
                                      />
                                      <span className="text-slate-600 font-bold text-[10px] uppercase">até</span>
                                      <input 
                                        type="time" 
                                        value={tempHours[day].closeTime} 
                                        onChange={(e) => updateDay(day, 'closeTime', e.target.value)}
                                        className="bg-black border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-cyan-400 outline-none focus:border-cyan-500"
                                      />
                                   </div>
                                ) : (
                                   <span className="text-[10px] font-black text-red-500/50 uppercase tracking-widest italic">Loja Fechada</span>
                                )}
                             </div>

                             <button 
                               onClick={() => updateDay(day, 'isOpen', !tempHours[day].isOpen)}
                               className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${tempHours[day].isOpen ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'}`}
                             >
                                {tempHours[day].isOpen ? 'Fechar' : 'Abrir'}
                             </button>
                          </div>
                       ))}
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between p-8 bg-black/40 rounded-3xl border border-white/5 gap-6">
                        <div className="flex items-center gap-3 text-slate-500">
                           <AlertCircle size={20} className="text-amber-500" />
                           <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">As alterações serão aplicadas instantaneamente para todos os usuários do site.</p>
                        </div>
                        <button 
                          onClick={handleSaveHours}
                          className="w-full sm:w-auto bg-cyan-600 text-white font-black px-12 py-5 rounded-2xl text-[10px] uppercase tracking-widest shadow-2xl hover:bg-cyan-500 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                           <Save size={18} /> Salvar Cronograma
                        </button>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
                {products.map((product) => (
                    <div key={product.id} className="bg-slate-900 border border-white/5 rounded-[2rem] p-4 flex items-center gap-5 group hover:border-cyan-500/30 transition-all shadow-xl">
                        <div className="w-20 h-20 rounded-2xl bg-black border border-white/5 flex-shrink-0 flex items-center justify-center overflow-hidden p-3">
                            <img src={product.image} className="max-h-full object-contain drop-shadow-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-bold text-white truncate">{product.name}</h3>
                            <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest">{product.brand}</p>
                            <p className="text-[11px] font-black text-cyan-400 mt-2">R$ {product.price.toLocaleString('pt-BR')}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => openEdit(product)} className="p-2.5 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 rounded-xl border border-cyan-500/10 transition-all"><Edit size={16}/></button>
                            <button onClick={() => deleteProduct(product.id)} className="p-2.5 text-red-500 bg-red-500/5 hover:bg-red-500/10 rounded-xl border border-red-500/10 transition-all"><Trash2 size={16}/></button>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'hero' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-fade-in">
                <label className="aspect-[9/16] rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-slate-700 hover:border-cyan-500/50 hover:text-cyan-500 cursor-pointer transition-all bg-slate-900/30">
                    <Upload size={32} />
                    <span className="text-[9px] font-black uppercase mt-4 tracking-widest">Novo Banner</span>
                    <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="hidden" />
                </label>
                {heroImages.map((img) => (
                    <div key={img.id} className="relative aspect-[9/16] rounded-3xl overflow-hidden group shadow-2xl border border-white/5">
                        <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                           <button onClick={() => deleteHeroImage(img.id)} className="bg-red-500 text-white p-4 rounded-2xl shadow-xl hover:scale-110 transition-all active:scale-95"><Trash2 size={20}/></button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden scale-up">
            
            <div className="px-10 py-6 border-b border-white/5 flex justify-between items-center">
                <div>
                   <h3 className="text-lg font-black tracking-tighter text-white uppercase">{editingProduct ? 'Editar Ativo' : 'Novo Ativo'}</h3>
                   <p className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.3em]">Management Protocol v2.0</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 rounded-full text-slate-500 hover:text-red-400 transition-all"><X size={24}/></button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                <div className="lg:col-span-4 space-y-6">
                  <div className="aspect-square rounded-[2.5rem] bg-black border border-white/5 flex items-center justify-center overflow-hidden relative group shadow-inner">
                    <div className="absolute inset-0 bg-cyan-500/5 opacity-50 blur-3xl rounded-full"></div>
                    {formData.image ? (
                        <img src={formData.image} className="max-h-full p-10 object-contain relative z-10 drop-shadow-2xl" />
                    ) : (
                        <div className="text-slate-800 flex flex-col items-center relative z-10"><ImageIcon size={64} /><span className="text-[10px] uppercase font-black mt-4 tracking-widest">Sem Imagem</span></div>
                    )}
                    <label className="absolute inset-0 cursor-pointer opacity-0 group-hover:opacity-100 bg-black/80 flex items-center justify-center transition-all z-20 backdrop-blur-sm">
                        <Upload size={32} className="text-white" />
                        <input type="file" accept="image/*" onChange={handleProductImageUpload} className="hidden" />
                    </label>
                  </div>

                  <button type="button" onClick={handleAiIdentify} disabled={isAiLoading || !formData.image} className="w-full py-5 rounded-2xl bg-cyan-600 text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-cyan-500 disabled:opacity-30 shadow-xl transition-all">
                    {isAiLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />} Escaneamento Gemini AI
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 ${formData.isNew ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-white/5 border-white/5 text-slate-500'}`} onClick={() => setFormData(prev => ({ ...prev, isNew: !prev.isNew }))}>
                        <CheckCircle2 size={20} className={formData.isNew ? 'opacity-100' : 'opacity-20'} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Condição: Novo</span>
                    </div>
                    <div className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 ${formData.featured ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-white/5 border-white/5 text-slate-500'}`} onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}>
                        <Award size={20} className={formData.featured ? 'opacity-100' : 'opacity-20'} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Destaque: Sim</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Nome do Aparelho</label>
                      <input name="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-cyan-500 outline-none transition-all shadow-inner" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Marca</label>
                      <select name="brand" value={formData.brand} onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value as Brand }))} className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-[10px] font-black uppercase text-white outline-none focus:border-cyan-500 cursor-pointer shadow-inner">
                        {Object.values(Brand).map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Categoria</label>
                      <select name="category" value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Category }))} className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-[10px] font-black uppercase text-white outline-none focus:border-cyan-500 cursor-pointer shadow-inner">
                        {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Preço de Venda (R$)</label>
                      <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-500 font-black text-xs">R$</div>
                        <input type="number" name="price" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))} className="w-full bg-black border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm font-black text-white focus:border-cyan-500 outline-none shadow-inner" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Preço Anterior (R$)</label>
                      <input type="number" name="originalPrice" value={formData.originalPrice || ''} onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))} className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-sm font-black text-slate-800 focus:border-cyan-500 outline-none shadow-inner" />
                    </div>
                  </div>

                  <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
                    <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3"><Smartphone size={14}/> Matriz de Especificações</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {Object.keys(initialSpec).map((key) => (
                          <div key={key} className="space-y-2">
                              <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest ml-1">{key}</label>
                              <input 
                                name={key} 
                                value={(formData.specs as any)[key]} 
                                onChange={(e) => setFormData(prev => ({ ...prev, specs: { ...prev.specs, [key]: e.target.value } }))}
                                className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-[11px] font-bold text-slate-300 outline-none focus:border-cyan-500 transition-all shadow-inner" 
                                placeholder="VALOR_TÉCNICO" 
                              />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Descrição Narrativa</label>
                    <textarea name="description" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={4} className="w-full bg-black border border-white/5 rounded-[2rem] px-8 py-6 text-xs font-light text-slate-300 focus:border-cyan-500 outline-none resize-none shadow-inner" placeholder="Enter tech narrative..." />
                  </div>
                </div>
              </div>
            </form>

            <div className="px-10 py-10 bg-slate-950 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                 <div className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                    <Terminal size={14} className="text-cyan-500"/> Master Commital: Ready
                 </div>
                 <div className="flex gap-4 w-full sm:w-auto">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 sm:flex-none text-[10px] font-black uppercase text-slate-500 hover:text-white px-8 py-4 bg-white/5 rounded-2xl transition-all border border-white/5">Abortar</button>
                    <button onClick={handleSave} className="flex-1 sm:flex-none bg-white text-black font-black px-12 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3">
                       <Save size={18}/> Salvar Ativo
                    </button>
                 </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;