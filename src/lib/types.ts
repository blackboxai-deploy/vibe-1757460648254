export interface Store {
  _id: string;
  name: string;
  category: string;
  logoUrl: string;
  bannerUrl?: string;
  address: string;
  province: string;
  city: string;
  suburbs: string[];
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  deliveryZones: Array<{
    type: 'Polygon' | 'Circle';
    center?: [number, number];
    radiusKm?: number;
  }>;
  owner: string;
  etaMin: number;
  etaMax: number;
  baseDeliveryFee: number;
  perKmFee: number;
  createdAt: Date;
  distance?: number; // calculated field
}

export interface Product {
  _id: string;
  store: string | Store;
  name: string;
  unit: string;
  price: number;
  imageUrl: string;
  vatRate: number;
  inStock: boolean;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  customer: string;
  store: string | Store;
  items: Array<{
    product: string | Product;
    quantity: number;
    price: number;
  }>;
  total: number;
  deliveryFee: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked' | 'delivered' | 'canceled';
  deliveryAddress: string;
  createdAt: Date;
}

export interface Job {
  _id: string;
  order: string | Order;
  pickup: [number, number]; // [lng, lat]
  dropoff: [number, number];
  distanceKm: number;
  status: 'open' | 'assigned' | 'picked' | 'delivered' | 'canceled';
  courier?: string;
  createdAt: Date;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'courier' | 'admin';
  phone?: string;
  address?: string;
  createdAt: Date;
}

export interface AuthUser {
  sub: string;
  role: 'customer' | 'merchant' | 'courier' | 'admin';
}

export interface LocationQuery {
  province?: string;
  city?: string;
  suburb?: string;
}

export interface CheckoutSession {
  items: Array<{
    name: string;
    amount: number;
    quantity: number;
  }>;
  meta?: Record<string, unknown>;
}

// South African provinces
export const provinces = [
  'Eastern Cape',
  'Western Cape', 
  'Gauteng',
  'KwaZulu-Natal',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape'
] as const;

export type Province = typeof provinces[number];

// Language types
export type Language = 'en' | 'af' | 'xh' | 'zu';

export interface LanguageDict {
  [key: string]: string;
}