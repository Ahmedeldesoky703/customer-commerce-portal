
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    stock: 15
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and waterproof design.',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    stock: 8
  },
  {
    id: '3',
    name: 'Professional Camera',
    description: 'DSLR camera with 24MP sensor, 4K video recording, and professional lens kit.',
    price: 899.99,
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    stock: 5
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support, adjustable height, and premium materials.',
    price: 349.99,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop'
    ],
    category: 'Furniture',
    stock: 12
  },
  {
    id: '5',
    name: 'Wireless Charging Station',
    description: 'Multi-device wireless charging pad compatible with all Qi-enabled devices.',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1609592917680-89c3ec3e2b4a?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    stock: 25
  },
  {
    id: '6',
    name: 'Premium Coffee Maker',
    description: 'Automatic coffee maker with built-in grinder, programmable settings, and thermal carafe.',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=500&fit=crop'
    ],
    category: 'Kitchen',
    stock: 18
  }
];
