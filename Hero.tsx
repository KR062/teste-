import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { WHATSAPP_NUMBER } from '../constants';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const { heroImages } = useData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages]);

  const handleSupportClick = () => {
    const message = "Olá P.A Celular! Preciso de assistência técnica para o meu aparelho.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div id="hero" className="relative bg-transparent overflow-hidden">
      {/* Luzes decorativas locais */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
         <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]"></div>
         <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left mb-16 md:mb-0">
          <span className="inline-block text-cyan-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Referência na Santa Ifigênia</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
            TECNOLOGIA QUE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">PULSA.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
            Descubra os melhores smartphones com procedência garantida. O futuro da sua conexão está na P.A Celular.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={onCtaClick}
              className="px-10 py-5 bg-white text-black font-black rounded-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)] uppercase text-[10px] tracking-widest"
            >
              Ver Catálogo
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={handleSupportClick}
              className="px-10 py-5 bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 text-white font-black rounded-2xl transition-all uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} /> Suporte Técnico
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <div className="flex items-center gap-2 group cursor-default">
              <CheckCircle2 size={16} className="text-cyan-500 group-hover:scale-125 transition-transform" />
              <span>Garantia de 1 Ano</span>
            </div>
            <div className="flex items-center gap-2 group cursor-default">
              <CheckCircle2 size={16} className="text-cyan-500 group-hover:scale-125 transition-transform" />
              <span>Peças Originais</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            {/* Glow Effect behind phone */}
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full scale-150 animate-pulse"></div>
            
            <div className="w-[280px] h-[580px] bg-black rounded-[3.5rem] border-[6px] border-slate-900 shadow-2xl overflow-hidden relative transform rotate-[-3deg] hover:rotate-0 transition-all duration-700 hover:scale-105 z-10 group">
               
               <div className="absolute top-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent z-20 pointer-events-none"></div>
               
               <div className="w-full h-full relative">
                   {heroImages.length > 0 ? heroImages.map((img, index) => (
                       <img 
                            key={img.id}
                            src={img.url} 
                            alt="Preview" 
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} 
                       />
                   )) : (
                     <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-700">P.A</div>
                   )}
               </div>

               <div className="absolute bottom-12 left-0 w-full text-center z-30">
                 <p className="text-white font-black text-2xl tracking-tighter drop-shadow-2xl">P.A CELULAR</p>
                 <div className="flex justify-center gap-1 mt-2">
                    {heroImages.map((_, i) => (
                      <div key={i} className={`h-1 rounded-full transition-all ${i === currentImageIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-white/20'}`}></div>
                    ))}
                 </div>
               </div>
               
               {/* Reflexo */}
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;