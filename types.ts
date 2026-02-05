
export enum Brand {
  APPLE = 'Apple',
  SAMSUNG = 'Samsung',
  XIAOMI = 'Xiaomi',
  MOTOROLA = 'Motorola'
}

export enum Category {
  SMARTPHONES = 'Smartphones',
  ACESSORIOS = 'Acessórios',
  TABLETS = 'Tablets',
  OUTROS = 'Outros'
}

export interface BusinessDay {
  isOpen: boolean;
  openTime: string; // Format HH:mm
  closeTime: string; // Format HH:mm
}

export interface BusinessHours {
  monday: BusinessDay;
  tuesday: BusinessDay;
  wednesday: BusinessDay;
  thursday: BusinessDay;
  friday: BusinessDay;
  saturday: BusinessDay;
  sunday: BusinessDay;
}

export interface PhoneSpec {
  screen: string;
  processor: string;
  ram: string;
  storage: string;
  camera: string;
  battery: string;
  os: string;
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  originalPrice?: number;
  image: string;
  specs: PhoneSpec;
  description: string;
  isNew: boolean;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface HeroImage {
  id: string;
  url: string;
}
