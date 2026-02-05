import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types';
import { useData } from '../contexts/DataContext';
import { WHATSAPP_NUMBER } from '../constants';
import { 
  X, 
  MessageCircle, 
  Cpu, 
  Battery, 
  Smartphone, 
  Camera, 
  ShieldCheck,
  Zap,
  ChevronRight,
  Info,
  Monitor
} from 'lucide-react';

const ProductGrid: React.FC = () => {
  const { products } = useData();
  const [filter, setFilter] = useState<Category | 'Todos'>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [selectedProduct]);

  const filteredProducts = filter === 'Todos' 
    ? products 
    : products.filter(p => p.category === filter);

  const handleBuyNow = (product: Product) => {
    const message = `Olá P.A Celular! Vi o item *${product.name}* no site e gostaria de saber sobre a disponibilidade.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="products" className="py-20 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Filtros Clean */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-1">
            <span className="text-cyan-500 font-bold tracking-[0.2em] uppercase text-[10px]">Premium Selection</span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
              Catálogo <span className="text-cyan-400">P.A</span>
            </h2>
          </div>

          <div className="flex overflow-x-auto pb-2 md:pb-0 scrollbar-hide gap-2 bg-white/5 p-1 rounded-2xl backdrop-blur-md border border-white/5 w-full md:w-auto">
            {['Todos', ...Object.values(Category)].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as Category | 'Todos')}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                  filter === cat
                    ? 'bg-white text-black shadow-lg shadow-white/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              className="group relative flex flex-col bg-slate-900/30 border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 cursor-pointer"
            >
              <div className="relative aspect-square flex items-center justify-center p-6 bg-gradient-to-b from-white/5 to-transparent">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  loading="lazy"
                  className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl" 
                />
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-cyan-500 text-black text-[7px] font-black px-2 py-0.5 rounded-md uppercase z-10">
                    NOVO
                  </div>
                )}
              </div>

              <div className="p-4 pt-0">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{product.brand}</p>
                <h3 className="text-[11px] font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">{product.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-black text-white">R$ {product.price.toLocaleString('pt-BR')}</span>
                  <ChevronRight size={12} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detalhes do Produto */}
        {selectedProduct && (
          <div 
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in p-0 sm:p-4"
            onClick={() => setSelectedProduct(null)}
          >
             <div 
                className="bg-slate-900 border-t sm:border border-white/10 rounded-t-[2.5rem] sm:rounded-[3rem] w-full max-w-4xl max-h-[92vh] flex flex-col relative animate-scale-up overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
             >
                {/* Cabeçalho */}
                <div className="flex justify-between items-center px-8 py-6 border-b border-white/5 shrink-0 bg-slate-900/50 backdrop-blur-md">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
                        <Smartphone size={20} />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detalhes do Ativo</span>
                   </div>
                   <button 
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 bg-white/5 rounded-full hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                   >
                     <X size={20} />
                   </button>
                </div>

                {/* Conteúdo com Scroll */}
                <div className="flex-1 overflow-y-auto p-8 sm:p-12 scrollbar-hide overscroll-contain">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Lado Imagem */}
                      <div className="space-y-8">
                         <div className="aspect-square rounded-[2.5rem] bg-black/40 border border-white/5 flex items-center justify-center p-12 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full opacity-50"></div>
                            <img 
                              src={selectedProduct.image} 
                              alt={selectedProduct.name} 
                              className="max-h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(6,182,212,0.15)]"
                            />
                         </div>
                         
                         <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-1">
                               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Preço à vista</span>
                               <span className="text-xl font-black text-cyan-400">R$ {selectedProduct.price.toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-1">
                               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Condição</span>
                               <span className="text-xs font-black text-white uppercase">{selectedProduct.isNew ? 'Lacrado / Novo' : 'Seminovo Premium'}</span>
                            </div>
                         </div>
                      </div>

                      {/* Lado Info */}
                      <div className="space-y-10">
                         <div>
                            <span className="text-cyan-500 font-black text-[9px] uppercase tracking-[0.3em]">{selectedProduct.brand}</span>
                            <h2 className="text-3xl font-black text-white tracking-tighter uppercase mt-1 leading-none">{selectedProduct.name}</h2>
                            <p className="text-slate-400 text-sm mt-6 font-light leading-relaxed">
                               {selectedProduct.description}
                            </p>
                         </div>

                         {/* Specs Grid */}
                         <div className="grid grid-cols-2 gap-6 bg-black/20 p-8 rounded-[2rem] border border-white/5">
                            <div className="flex items-start gap-3">
                               <Cpu size={18} className="text-cyan-500 shrink-0" />
                               <div>
                                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Processador</p>
                                  <p className="text-[10px] font-bold text-slate-200 mt-0.5">{selectedProduct.specs.processor}</p>
                               </div>
                            </div>
                            <div className="flex items-start gap-3">
                               <Monitor size={18} className="text-cyan-500 shrink-0" />
                               <div>
                                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Tela</p>
                                  <p className="text-[10px] font-bold text-slate-200 mt-0.5">{selectedProduct.specs.screen}</p>
                               </div>
                            </div>
                            <div className="flex items-start gap-3">
                               <Zap size={18} className="text-cyan-500 shrink-0" />
                               <div>
                                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Memória</p>
                                  <p className="text-[10px] font-bold text-slate-200 mt-0.5">{selectedProduct.specs.ram} / {selectedProduct.specs.storage}</p>
                               </div>
                            </div>
                            <div className="flex items-start gap-3">
                               <Battery size={18} className="text-cyan-500 shrink-0" />
                               <div>
                                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Bateria</p>
                                  <p className="text-[10px] font-bold text-slate-200 mt-0.5">{selectedProduct.specs.battery}</p>
                               </div>
                            </div>
                            <div className="flex items-start gap-3 col-span-2">
                               <Camera size={18} className="text-cyan-500 shrink-0" />
                               <div>
                                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Câmeras</p>
                                  <p className="text-[10px] font-bold text-slate-200 mt-0.5">{selectedProduct.specs.camera}</p>
                               </div>
                            </div>
                         </div>

                         <div className="flex flex-col gap-4">
                            <button 
                              onClick={() => handleBuyNow(selectedProduct)}
                              className="w-full py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-cyan-500 hover:text-white transition-all shadow-xl uppercase text-[10px] tracking-widest active:scale-95"
                            >
                               <MessageCircle size={18} /> Consultar Disponibilidade
                            </button>
                            <div className="flex items-center justify-center gap-4 text-slate-600">
                               <div className="flex items-center gap-1.5">
                                  <ShieldCheck size={14} />
                                  <span className="text-[8px] font-black uppercase">Garantia P.A</span>
                               </div>
                               <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                               <div className="flex items-center gap-1.5">
                                  <Zap size={14} />
                                  <span className="text-[8px] font-black uppercase">Entrega Full</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;