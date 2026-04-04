import { create } from "zustand";
import axios from "axios";
import type { Product } from "./cartStore";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<Product | null>;
}

// Helper to sanitize image URLs from Platzi API
const sanitizeImage = (images: string[]): string => {
  if (!images || images.length === 0) return "https://placehold.co/600x400";
  let img = images[0];
  try {
    // Sometimes Platzi users submit stringified arrays as strings
    if (typeof img === 'string' && img.startsWith('["')) {
      const parsed = JSON.parse(img);
      img = parsed[0] || img;
    }
    // Sometimes there are extra quotes around it implicitly
    if (typeof img === 'string') {
      img = img.replace(/^\["|"]"?$/g, '');
      img = img.replace(/^"|"$/g, '');
    }
    return img;
  } catch (e) {
    return "https://placehold.co/600x400";
  }
};

const mapPlatziToProduct = (item: any): Product => ({
  id: item.id,
  title: item.title,
  price: item.price,
  description: item.description,
  category: item.category?.name || "Other",
  image: sanitizeImage(item.images),
  rating: {
    rate: Number((4 + Math.random()).toFixed(2)), // Platzi doesn't provide rating, mock high ratings for premium feel
    count: Math.floor(Math.random() * 200) + 50 
  }
});

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    // Return early if we already have products (simple caching)
    if (get().products.length > 0) return;

    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/products?limit=24&offset=0");
      const mappedProducts = response.data.map(mapPlatziToProduct);
      set({ products: mappedProducts, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch products", isLoading: false });
    }
  },
  fetchProductById: async (id: number) => {
    // Check cache first
    const existingProduct = get().products.find(p => p.id === id);
    if (existingProduct) return existingProduct;

    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
      set({ isLoading: false });
      return mapPlatziToProduct(response.data);
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch product", isLoading: false });
      return null;
    }
  }
}));
