import { Brand, Category, Product, ServiceItem, HeroImage, BusinessHours } from './types';

export const STORE_NAME = "P.A CELULAR";
export const WHATSAPP_NUMBER = "5511941819000"; 
export const DISPLAY_PHONE = "(11) 94181-9000";
export const STORE_ADDRESS = "Rua Santa Ifigênia, 180 - Loja 12 - Santa Ifigênia, São Paulo - SP, 01207-000";
// Link exato fornecido pelo cliente
export const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/LwJgHMhvfG7XRh3VA?g_st=ic";
export const WAZE_LINK = "https://waze.com/ul?q=Rua+Santa+Ifigenia+180+Sao+Paulo";

export const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  monday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
  tuesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
  wednesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
  thursday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
  friday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
  saturday: { isOpen: true, openTime: '09:00', closeTime: '15:00' },
  sunday: { isOpen: false, openTime: '00:00', closeTime: '00:00' },
};

export const HERO_IMAGES: HeroImage[] = [
  { id: 'h1', url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop' },
  { id: 'h2', url: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=1200&auto=format&fit=crop' },
  { id: 'h3', url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1200&auto=format&fit=crop' }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    brand: Brand.APPLE,
    category: Category.SMARTPHONES,
    price: 8490.00,
    originalPrice: 9500.00,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=500&auto=format&fit=crop',
    isNew: true,
    featured: true,
    description: 'O iPhone definitivo com acabamento em titânio aeroespacial. Performance insuperável para fotos e vídeos profissionais com o chip A17 Pro.',
    specs: {
      screen: '6.7" Super Retina XDR OLED',
      processor: 'A17 Pro (3nm)',
      ram: '8GB LPDDR5X',
      storage: '256GB NVMe',
      camera: '48MP Main + 12MP Telephoto 5x',
      battery: '4441 mAh (Longa Duração)',
      os: 'iOS 17 (Atualizável)'
    }
  },
  {
    id: '2',
    name: 'Galaxy S24 Ultra 512GB',
    brand: Brand.SAMSUNG,
    category: Category.SMARTPHONES,
    price: 7290.00,
    image: 'https://images.unsplash.com/photo-1707248554227-28562725e197?q=80&w=500&auto=format&fit=crop',
    isNew: true,
    featured: true,
    description: 'A revolução da Inteligência Artificial. Galaxy AI integrada para tradução em tempo real e edição de fotos profissional.',
    specs: {
      screen: '6.8" Dynamic AMOLED 2x 120Hz',
      processor: 'Snapdragon 8 Gen 3 for Galaxy',
      ram: '12GB',
      storage: '512GB',
      camera: '200MP + 50MP + 12MP + 10MP',
      battery: '5000 mAh (45W Fast Charge)',
      os: 'Android 14 (One UI 6.1)'
    }
  }
];

export const SERVICES: ServiceItem[] = [
  { id: 's1', title: 'Troca de Vidro', description: 'Reparo especializado utilizando cola OCA e vácuo, preservando sua tela original.', iconName: 'Smartphone' },
  { id: 's2', title: 'Bateria Original', description: 'Substituição com peças homologadas e aviso de saúde original para iPhones.', iconName: 'BatteryCharging' },
  { id: 's3', title: 'Reparo em Placa', description: 'Soluções para aparelhos que não ligam, molharam ou possuem curto-circuito.', iconName: 'Cpu' },
  { id: 's4', title: 'Acessórios Premium', description: 'Linha completa de carregadores e cabos com certificação MFi e Anatel.', iconName: 'Headphones' }
];

export const SYSTEM_INSTRUCTION = `
Você é o Especialista da P.A CELULAR. Estamos na Rua Santa Ifigênia, 180, Loja 12.
Seu objetivo é fornecer informações precisas e técnicas.
Sempre informe que todos os aparelhos acompanham garantia e procedência.
Preços de referência: iPhone 15 Pro Max (R$ 8.490) e S24 Ultra (R$ 7.290).
O link para nossa localização exata é ${GOOGLE_MAPS_LINK}.
O WhatsApp é ${DISPLAY_PHONE}.
Responda de forma profissional e encoraje a visita à loja física na galeria do número 180.
`;