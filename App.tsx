import React, { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Services from './components/Services';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import AdminPanel from './components/AdminPanel';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import { ShieldCheck, Zap, Globe, Award, HelpCircle, ChevronDown, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { GOOGLE_MAPS_LINK, WAZE_LINK, STORE_ADDRESS } from './constants';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className="text-sm font-bold text-slate-300 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{question}</span>
        <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-500' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}>
        <p className="text-xs text-slate-500 leading-relaxed font-light">{answer}</p>
      </div>
    </div>
  );
};

export function App() {
  const [view, setView] = useState<'home' | 'admin'>('home');

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const HomeView = () => (
    <div className="animate-fade-in">
      <Navbar onNavigate={scrollToSection} />
      <Hero onCtaClick={() => scrollToSection('products')} />
      <ProductGrid />
      <Services />
      
      {/* Seção Máximo Informativa: Localização e Sobre */}
      <section id="about" className="py-32 bg-transparent text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              
              {/* Card de Localização Simplificado */}
              <div className="space-y-8">
                <span className="text-cyan-500 font-bold tracking-[0.4em] uppercase text-[10px] bg-cyan-500/5 px-4 py-2 rounded-full border border-cyan-500/10">Onde estamos</span>
                <h2 className="text-4xl md:text-6xl font-black mt-6 tracking-tighter uppercase leading-none">P.A <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CELULAR</span></h2>
                
                <div className="bg-slate-900/50 p-12 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden group">
                   {/* Efeito de fundo no hover */}
                   <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                   {/* Símbolo de Localização */}
                   <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center border border-white/5 shadow-[0_0_40px_rgba(6,182,212,0.1)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                      <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full animate-pulse"></div>
                      <MapPin size={48} className="text-cyan-400 relative z-10" />
                   </div>

                   <div className="relative z-10">
                      <h4 className="text-xl font-black uppercase tracking-widest text-white mb-2">Rua Santa Ifigênia, 180</h4>
                      <p className="text-cyan-400 font-bold text-sm tracking-widest uppercase">Loja 12</p>
                      <p className="text-slate-500 text-xs mt-4 max-w-xs mx-auto">{STORE_ADDRESS}</p>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4 w-full pt-4 relative z-10">
                      <a 
                        href={GOOGLE_MAPS_LINK} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-4 bg-white text-black font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-cyan-500 hover:text-white transition-all shadow-xl active:scale-95"
                      >
                        <Navigation size={16} /> Ver no GPS
                      </a>
                      <a 
                        href={WAZE_LINK} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-4 bg-slate-800 text-white font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-white/5 hover:bg-slate-700 transition-all"
                      >
                        <ExternalLink size={16} /> Abrir Waze
                      </a>
                   </div>
                </div>
              </div>

              {/* FAQ Informativo */}
              <div className="bg-slate-900/30 p-10 rounded-[3rem] border border-white/5 self-start">
                <div className="flex items-center gap-3 mb-8">
                  <HelpCircle className="text-cyan-500" size={24} />
                  <h3 className="text-lg font-black uppercase tracking-tighter">Central de Informações</h3>
                </div>
                <div className="space-y-2">
                  <FAQItem 
                    question="É seguro comprar na Santa Ifigênia?" 
                    answer="Na P.A CELULAR sim! Temos loja física estabelecida (Loja 12 da Galeria 180), com CNPJ ativo e milhares de clientes satisfeitos. Emitimos recibo e garantia em todos os ativos." 
                  />
                  <FAQItem 
                    question="Como funciona a avaliação de usados?" 
                    answer="Trazendo seu aparelho na Loja 12, nossos técnicos fazem o diagnóstico de hardware na hora (cerca de 15 min). O valor da avaliação é abatido diretamente na compra do seu novo smartphone." 
                  />
                  <FAQItem 
                    question="Vocês parcelam no cartão?" 
                    answer="Sim, parcelamos em até 18x nos cartões de crédito com as melhores taxas do mercado. Também aceitamos Pix com desconto exclusivo." 
                  />
                  <FAQItem 
                    question="Os iPhones são de vitrine ou novos?" 
                    answer="Trabalhamos com ambos. Temos a linha lacrada com 1 ano de garantia Apple e a linha 'Grade A+' (vitrine) que passa por 30 testes rigorosos antes da venda." 
                  />
                  <FAQItem 
                    question="Quais os horários de pico na loja?" 
                    answer="O maior movimento costuma ser entre 11:30 e 14:30. Se busca um atendimento mais calmo, sugerimos o período da manhã entre 09:00 e 10:30." 
                  />
                </div>
              </div>

           </div>

           {/* Grid de Diferenciais */}
           <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: <ShieldCheck size={32}/>, title: "Qualidade", desc: "Aparelhos sem histórico de reparos em placa ou tela trocada." },
                { icon: <Zap size={32}/>, title: "Velocidade", desc: "Configuramos seu celular novo e migramos seus dados na hora." },
                { icon: <Globe size={32}/>, title: "Confiança", desc: "Atendimento humanizado focado na sua real necessidade." },
                { icon: <Award size={32}/>, title: "Pós-Venda", desc: "Suporte contínuo via WhatsApp mesmo após a garantia." }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-slate-900/30 rounded-[3rem] border border-white/5 hover:border-cyan-500/20 transition-all duration-500 group">
                  <div className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest mb-3">{item.title}</h4>
                  <p className="text-slate-500 text-xs font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
      
      <Footer onAdminClick={() => setView('admin')} />
      <AIChat />
    </div>
  );

  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen bg-transparent">
          {view === 'home' ? <HomeView /> : <AdminPanel onBack={() => setView('home')} />}
        </div>
      </DataProvider>
    </AuthProvider>
  );
}