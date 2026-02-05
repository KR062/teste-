import React, { useState } from 'react';
import { SERVICES, WHATSAPP_NUMBER } from '../constants';
import { 
  X, 
  Send, 
  Smartphone, 
  User, 
  MessageSquare, 
  Phone,
  BatteryCharging,
  Cpu,
  Headphones,
  Wrench,
  Sparkles
} from 'lucide-react';

const Services: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    device: '',
    defect: ''
  });

  const iconMap: Record<string, React.ReactNode> = {
    'Smartphone': <Smartphone size={28} />,
    'BatteryCharging': <BatteryCharging size={28} />,
    'Cpu': <Cpu size={28} />,
    'Headphones': <Headphones size={28} />,
    'Wrench': <Wrench size={28} />
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá P.A Celular! Orçamento técnico:\n*Nome:* ${formData.name}\n*Aparelho:* ${formData.device}\n*Problema:* ${formData.defect}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <section id="services" className="py-24 bg-transparent border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-500 font-bold tracking-[0.3em] uppercase text-[10px]">High Tech Lab</span>
          <h2 className="mt-2 text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Laboratório <span className="text-cyan-400">P.A</span></h2>
          <p className="mt-4 text-slate-500 font-light max-w-xl mx-auto text-sm">
            Precisão absoluta em reparos complexos. Tecnologia de ponta para o seu melhor companheiro digital.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service) => (
            <div key={service.id} className="p-8 bg-slate-900/40 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/20 transition-all duration-500 group">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6 text-slate-500 group-hover:text-cyan-400 group-hover:scale-110 transition-all">
                {iconMap[service.iconName] || <Wrench size={28} />}
              </div>
              <h3 className="text-sm font-black text-white mb-2 uppercase tracking-tight">{service.title}</h3>
              <p className="text-slate-500 text-xs font-light leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-slate-900 rounded-[3rem] p-10 md:p-14 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 text-center md:text-left">
                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Diagnóstico <span className="text-cyan-400 text-white font-bold">Gratuito</span></h3>
                <p className="text-slate-400 font-light text-xs max-w-sm">
                    Fale com nossos técnicos especializados e receba uma estimativa de preço em menos de 10 minutos.
                </p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 bg-white text-black hover:bg-cyan-500 hover:text-white font-black py-4 px-10 rounded-2xl transition-all uppercase text-[10px] tracking-widest shadow-2xl active:scale-95 flex items-center gap-3"
            >
                <Sparkles size={16}/> Abrir Chamado
            </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in">
          <div className="bg-slate-900 border-t sm:border border-white/10 rounded-t-[2.5rem] sm:rounded-[3rem] w-full max-w-xl max-h-[90vh] flex flex-col animate-scale-up overflow-hidden">
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <h2 className="text-lg font-black text-white uppercase tracking-tighter">Nova Solicitação</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-red-400 transition-all"><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto overscroll-contain">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome</label>
                     <input required name="name" onChange={handleInputChange} className="w-full bg-black border border-white/5 rounded-xl p-4 text-white text-xs outline-none focus:border-cyan-500" placeholder="Seu nome" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Fone</label>
                     <input required name="phone" onChange={handleInputChange} className="w-full bg-black border border-white/5 rounded-xl p-4 text-white text-xs outline-none focus:border-cyan-500" placeholder="(00) 00000-0000" />
                   </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Aparelho</label>
                  <input required name="device" onChange={handleInputChange} className="w-full bg-black border border-white/5 rounded-xl p-4 text-white text-xs outline-none focus:border-cyan-500" placeholder="Ex: iPhone 13 Pro" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Defeito</label>
                  <textarea required name="defect" onChange={handleInputChange} rows={3} className="w-full bg-black border border-white/5 rounded-xl p-4 text-white text-xs outline-none focus:border-cyan-500 resize-none" placeholder="O que aconteceu?" />
                </div>
              </div>
              <button type="submit" className="w-full bg-cyan-600 text-white font-black py-4 rounded-xl hover:bg-cyan-500 transition-all uppercase text-[10px] tracking-widest shadow-xl flex items-center justify-center gap-3">
                <Send size={16}/> Enviar para o Técnico
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
