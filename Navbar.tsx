
import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone, Wrench, Phone, Info, Clock } from 'lucide-react';
import { STORE_NAME } from '../constants';
import { useData } from '../contexts/DataContext';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isStoreOpen } = useData();
  const [openStatus, setOpenStatus] = useState(false);

  useEffect(() => {
    setOpenStatus(isStoreOpen());
    const interval = setInterval(() => setOpenStatus(isStoreOpen()), 60000);
    return () => clearInterval(interval);
  }, [isStoreOpen]);

  const navItems = [
    { label: 'Celulares', id: 'products', icon: <Smartphone size={16} /> },
    { label: 'Serviços', id: 'services', icon: <Wrench size={16} /> },
    { label: 'Sobre', id: 'about', icon: <Info size={16} /> },
    { label: 'Contato', id: 'contact', icon: <Phone size={16} /> },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-950/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          <div className="flex items-center gap-4">
            <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick('hero')}>
              <div className="bg-cyan-600/20 p-2 rounded-xl mr-3 group-hover:scale-110 transition-transform border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Smartphone className="text-cyan-400" size={24} />
              </div>
              <span className="font-black text-xl text-white tracking-tighter uppercase">{STORE_NAME}</span>
            </div>

            {/* Status Bubble */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 ${
              openStatus 
              ? 'bg-green-500/5 border-green-500/20 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.1)]' 
              : 'bg-slate-800/50 border-white/5 text-slate-500'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${openStatus ? 'bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]' : 'bg-slate-600'}`}></div>
              <span className="text-[9px] font-black uppercase tracking-widest">{openStatus ? 'Aberto Agora' : 'Fechado'}</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <button
               onClick={() => handleNavClick('products')}
               className="bg-white text-black hover:bg-cyan-500 hover:text-white px-6 py-3 rounded-xl font-black transition-all uppercase text-[10px] tracking-widest shadow-xl active:scale-95"
            >
              Ofertas
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <div className={`flex items-center gap-2 px-2 py-1 rounded-full border ${openStatus ? 'border-green-500/20 text-green-500' : 'border-white/5 text-slate-500'}`}>
              <div className={`w-1 h-1 rounded-full ${openStatus ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
              <span className="text-[8px] font-black uppercase tracking-widest">{openStatus ? 'Aberto' : 'Fechado'}</span>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/5 animate-fade-in">
          <div className="px-6 py-8 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center space-x-4 w-full text-left p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
