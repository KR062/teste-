
import React from 'react';
import { Smartphone, Instagram, Facebook, MapPin, Phone, Mail, Lock, Heart, Terminal, ExternalLink } from 'lucide-react';
import { STORE_NAME, STORE_ADDRESS, GOOGLE_MAPS_LINK, DISPLAY_PHONE, WHATSAPP_NUMBER } from '../constants';

interface FooterProps {
    onAdminClick?: () => void;
}

// Defining the Footer component with missing logic and export
const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center text-white mb-6">
              <div className="bg-cyan-600/20 p-2.5 rounded-2xl mr-3 border border-cyan-500/20">
                <Smartphone className="text-cyan-400" size={24} />
              </div>
              <span className="font-black text-2xl tracking-tighter uppercase">{STORE_NAME}</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light max-w-xs">
              Especialistas em tecnologia de ponta e soluções mobile personalizadas. Sua conexão com o futuro começa aqui.
            </p>
            <div className="flex space-x-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-all p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500/30">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-all p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500/30">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-cyan-500">Expertise</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              <li><a href="#services" className="hover:text-white transition-colors">Micro-reparos</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Software Avançado</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Venda de Iphones</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Peças Originais</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div id="contact" className="md:col-span-2">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-cyan-500">Localização & Contato</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm font-light">
               <a 
                href={GOOGLE_MAPS_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start group hover:bg-white/5 p-4 rounded-3xl border border-transparent hover:border-white/5 transition-all"
               >
                <MapPin className="mr-4 text-cyan-500 shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <div className="flex flex-col">
                  <span className="text-slate-400 leading-relaxed">{STORE_ADDRESS}</span>
                  <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mt-2 flex items-center gap-1">Ver no Maps <ExternalLink size={8}/></span>
                </div>
              </a>
              <div className="space-y-4">
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group hover:bg-white/5 p-4 rounded-3xl border border-transparent hover:border-white/5 transition-all"
                >
                  <Phone className="mr-4 text-cyan-500 shrink-0 group-hover:rotate-12 transition-transform" size={18} />
                  <div className="flex flex-col">
                    <span className="text-slate-400">{DISPLAY_PHONE}</span>
                    <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mt-1">WhatsApp Business</span>
                  </div>
                </a>
                <div className="flex items-center p-4">
                  <Mail className="mr-4 text-cyan-500 shrink-0" size={18} />
                  <span className="text-slate-400 text-xs">contato@pacelular.com.br</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits - Personalized for Wk.Sitem */}
        <div className="border-t border-white/5 pt-12 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} {STORE_NAME}. TODOS OS DIREITOS RESERVADOS.</p>
            <div className="hidden sm:block w-px h-4 bg-white/10"></div>
            <div className="flex items-center gap-3 bg-slate-900 px-5 py-2.5 rounded-full border border-white/5 shadow-inner group">
                <Terminal size={12} className="text-cyan-500 group-hover:animate-pulse" />
                <span className="text-slate-400">Design por <span className="text-white">Wk.Sitems</span></span>
            </div>
          </div>
          <button 
            onClick={onAdminClick}
            className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-700 hover:text-white transition-colors"
          >
            Acesso Restrito
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
