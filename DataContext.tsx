
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Product, ServiceItem, HeroImage, BusinessHours } from '../types';
import { PRODUCTS, SERVICES, HERO_IMAGES, DEFAULT_BUSINESS_HOURS } from '../constants';

interface DataContextType {
  products: Product[];
  services: ServiceItem[];
  heroImages: HeroImage[];
  businessHours: BusinessHours;
  isStoreOpen: () => boolean;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addHeroImage: (image: HeroImage) => void;
  deleteHeroImage: (id: string) => void;
  updateBusinessHours: (hours: BusinessHours) => void;
}

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [services] = useState<ServiceItem[]>(SERVICES);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [businessHours, setBusinessHours] = useState<BusinessHours>(DEFAULT_BUSINESS_HOURS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Products
    const storedProducts = localStorage.getItem('pa_celular_products');
    setProducts(storedProducts ? JSON.parse(storedProducts) : PRODUCTS);

    // Load Hero Images
    const storedHeroImages = localStorage.getItem('pa_celular_hero_images');
    setHeroImages(storedHeroImages ? JSON.parse(storedHeroImages) : HERO_IMAGES);

    // Load Business Hours
    const storedHours = localStorage.getItem('pa_celular_hours');
    setBusinessHours(storedHours ? JSON.parse(storedHours) : DEFAULT_BUSINESS_HOURS);

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('pa_celular_products', JSON.stringify(products));
      localStorage.setItem('pa_celular_hero_images', JSON.stringify(heroImages));
      localStorage.setItem('pa_celular_hours', JSON.stringify(businessHours));
    }
  }, [products, heroImages, businessHours, isLoaded]);

  const isStoreOpen = () => {
    const now = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDayName = days[now.getDay()] as keyof BusinessHours;
    const config = businessHours[currentDayName];

    if (!config.isOpen) return false;

    const [openH, openM] = config.openTime.split(':').map(Number);
    const [closeH, closeM] = config.closeTime.split(':').map(Number);
    
    const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();
    const openTimeMinutes = openH * 60 + openM;
    const closeTimeMinutes = closeH * 60 + closeM;

    return currentTimeMinutes >= openTimeMinutes && currentTimeMinutes < closeTimeMinutes;
  };

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const updateProduct = (updatedProduct: Product) => setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  const addHeroImage = (image: HeroImage) => setHeroImages(prev => [...prev, image]);
  const deleteHeroImage = (id: string) => setHeroImages(prev => prev.filter(img => img.id !== id));
  const updateBusinessHours = (hours: BusinessHours) => setBusinessHours(hours);

  return (
    <DataContext.Provider value={{ 
        products, 
        services, 
        heroImages,
        businessHours,
        isStoreOpen,
        addProduct, 
        updateProduct, 
        deleteProduct,
        addHeroImage,
        deleteHeroImage,
        updateBusinessHours
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
