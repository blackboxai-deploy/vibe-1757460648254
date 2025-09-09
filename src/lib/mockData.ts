import { Store, Product, User } from './types';

export const mockStores: Store[] = [
  {
    _id: '1',
    name: 'Soweto Fresh',
    category: 'Grocer',
    logoUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0d7a5c17-0b5c-49c7-8e9d-d70cae664682.png',
    bannerUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/93b63df5-13d6-4b6c-be0d-fabc161398bf.png',
    address: '123 Vilakazi Street, Soweto',
    province: 'Gauteng',
    city: 'Johannesburg',
    suburbs: ['Soweto', 'Diepkloof'],
    location: {
      type: 'Point',
      coordinates: [27.8546, -26.2041]
    },
    deliveryZones: [{
      type: 'Circle',
      center: [27.8546, -26.2041],
      radiusKm: 10
    }],
    owner: 'merchant1',
    etaMin: 20,
    etaMax: 40,
    baseDeliveryFee: 18,
    perKmFee: 4.5,
    createdAt: new Date('2024-01-01'),
    distance: 3.2
  },
  {
    _id: '2',
    name: 'Cape Coast Foods',
    category: 'Grocer',
    logoUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/84449653-7f0c-4097-a10d-556efa0f5bb6.png',
    bannerUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fe38e5c7-f328-4449-b906-93e53330111a.png',
    address: '45 Long Street, Cape Town',
    province: 'Western Cape',
    city: 'Cape Town',
    suburbs: ['Khayelitsha', 'Claremont'],
    location: {
      type: 'Point',
      coordinates: [18.4241, -33.9249]
    },
    deliveryZones: [{
      type: 'Circle',
      center: [18.4241, -33.9249],
      radiusKm: 15
    }],
    owner: 'merchant2',
    etaMin: 22,
    etaMax: 45,
    baseDeliveryFee: 20,
    perKmFee: 4.8,
    createdAt: new Date('2024-01-02'),
    distance: 5.7
  },
  {
    _id: '3',
    name: 'eThekwini Market',
    category: 'Market',
    logoUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/081e00c0-4aa3-4d4e-8549-26b2b51e65a2.png',
    bannerUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/24f5d3d4-4772-402a-8497-8e51befa6b66.png',
    address: '78 Durban Road, Durban',
    province: 'KwaZulu-Natal',
    city: 'Durban',
    suburbs: ['Umlazi', 'Berea'],
    location: {
      type: 'Point',
      coordinates: [31.0218, -29.8587]
    },
    deliveryZones: [{
      type: 'Circle',
      center: [31.0218, -29.8587],
      radiusKm: 12
    }],
    owner: 'merchant3',
    etaMin: 18,
    etaMax: 38,
    baseDeliveryFee: 17,
    perKmFee: 4.2,
    createdAt: new Date('2024-01-03'),
    distance: 2.8
  },
  {
    _id: '4',
    name: 'Pretoria Provisions',
    category: 'Grocer',
    logoUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/be275ca5-040b-4bbd-9a0c-ec9b0eabd3ef.png',
    bannerUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/89876d27-faaa-4a18-baf1-d846c5d59d6b.png',
    address: '156 Church Street, Pretoria',
    province: 'Gauteng',
    city: 'Pretoria',
    suburbs: ['Hatfield', 'Arcadia'],
    location: {
      type: 'Point',
      coordinates: [28.1879, -25.7479]
    },
    deliveryZones: [{
      type: 'Circle',
      center: [28.1879, -25.7479],
      radiusKm: 8
    }],
    owner: 'merchant4',
    etaMin: 25,
    etaMax: 45,
    baseDeliveryFee: 19,
    perKmFee: 4.6,
    createdAt: new Date('2024-01-04'),
    distance: 4.1
  },
  {
    _id: '5',
    name: 'Bloemfontein Butchery',
    category: 'Butchery',
    logoUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cb6fd618-d605-45de-a10b-74e65a02a28f.png',
    bannerUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/00bbb173-d666-474e-8c23-e2761e15ddd1.png',
    address: '89 Maitland Street, Bloemfontein',
    province: 'Free State',
    city: 'Bloemfontein',
    suburbs: ['Westdene', 'Willows'],
    location: {
      type: 'Point',
      coordinates: [26.2041, -29.0852]
    },
    deliveryZones: [{
      type: 'Circle',
      center: [26.2041, -29.0852],
      radiusKm: 6
    }],
    owner: 'merchant5',
    etaMin: 30,
    etaMax: 50,
    baseDeliveryFee: 22,
    perKmFee: 5.0,
    createdAt: new Date('2024-01-05'),
    distance: 1.9
  }
];

export const mockProducts: Product[] = [
  // Soweto Fresh products
  {
    _id: 'p1',
    store: '1',
    name: 'Fresh Bananas',
    unit: 'per kg',
    price: 1899, // R18.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1dad61dd-a788-439a-93de-09b5b287e80f.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-01')
  },
  {
    _id: 'p2',
    store: '1',
    name: 'Whole Wheat Bread',
    unit: 'per loaf',
    price: 2299, // R22.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e42d1967-295d-404c-805f-56b85b0b2efa.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-01')
  },
  {
    _id: 'p3',
    store: '1',
    name: 'Free Range Eggs',
    unit: 'per dozen',
    price: 3499, // R34.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/06080d14-dfb2-4d81-bc9c-049024be26c3.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-01')
  },

  // Cape Coast Foods products
  {
    _id: 'p4',
    store: '2',
    name: 'Fresh Hake Fillets',
    unit: 'per kg',
    price: 12999, // R129.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7e18bd59-eb2f-49be-8c60-3644cf611f29.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-02')
  },
  {
    _id: 'p5',
    store: '2',
    name: 'Organic Tomatoes',
    unit: 'per kg',
    price: 2799, // R27.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ed16893f-dde0-46e8-9f2e-3a43144aca94.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-02')
  },
  {
    _id: 'p6',
    store: '2',
    name: 'Avocados',
    unit: 'per 4 pack',
    price: 3999, // R39.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d99fdc1b-d6b9-4770-b4c9-6b135898002a.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-02')
  },

  // eThekwini Market products
  {
    _id: 'p7',
    store: '3',
    name: 'Fresh Pineapple',
    unit: 'per piece',
    price: 2499, // R24.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b8c296b2-5ce6-4b97-9b2b-bdd82c965d4f.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-03')
  },
  {
    _id: 'p8',
    store: '3',
    name: 'Local Spinach',
    unit: 'per bunch',
    price: 1299, // R12.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/80eacba2-f7f4-40e3-84c1-e01e0832b542.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-03')
  },
  {
    _id: 'p9',
    store: '3',
    name: 'Sweet Potatoes',
    unit: 'per kg',
    price: 1999, // R19.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/95d47026-aad8-4eef-a16d-5c88060dd3d6.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-03')
  },

  // Pretoria Provisions products
  {
    _id: 'p10',
    store: '4',
    name: 'Full Cream Milk',
    unit: '2L',
    price: 2899, // R28.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/411059a3-ce4a-424b-9b52-a8b4b0b79943.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-04')
  },
  {
    _id: 'p11',
    store: '4',
    name: 'Cheddar Cheese',
    unit: '500g',
    price: 5999, // R59.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8cac35b0-57c6-487d-a3dc-d5fe0e5962c0.png',
    vatRate: 0.15,
    inStock: true,
    createdAt: new Date('2024-01-04')
  },

  // Bloemfontein Butchery products
  {
    _id: 'p12',
    store: '5',
    name: 'Premium Beef Steak',
    unit: 'per kg',
    price: 18999, // R189.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/735d6a31-facf-433c-8b38-7e8e16c06674.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-05')
  },
  {
    _id: 'p13',
    store: '5',
    name: 'Boerewors',
    unit: 'per kg',
    price: 8999, // R89.99 in cents
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9d0ce8eb-6524-4af0-b9a4-8c3c8514beb2.png',
    vatRate: 0,
    inStock: true,
    createdAt: new Date('2024-01-05')
  }
];

export const mockUsers: User[] = [
  {
    _id: 'customer1',
    email: 'john@example.com',
    name: 'John Smith',
    role: 'customer',
    phone: '+27 82 123 4567',
    address: '123 Main Street, Johannesburg',
    createdAt: new Date('2024-01-01')
  },
  {
    _id: 'merchant1',
    email: 'soweto@freshfetch.co.za',
    name: 'Thabo Mthembu',
    role: 'merchant',
    phone: '+27 11 123 4567',
    createdAt: new Date('2024-01-01')
  },
  {
    _id: 'courier1',
    email: 'sipho@courier.co.za',
    name: 'Sipho Ndlovu',
    role: 'courier',
    phone: '+27 72 987 6543',
    createdAt: new Date('2024-01-01')
  }
];

// Helper function to get products by store
export function getProductsByStore(storeId: string): Product[] {
  return mockProducts.filter(product => product.store === storeId);
}

// Helper function to filter stores by location
export function filterStoresByLocation(stores: Store[], province?: string, city?: string, suburb?: string): Store[] {
  return stores.filter(store => {
    if (province && store.province !== province) return false;
    if (city && store.city.toLowerCase() !== city.toLowerCase()) return false;
    if (suburb && !store.suburbs.some(s => s.toLowerCase().includes(suburb.toLowerCase()))) return false;
    return true;
  });
}