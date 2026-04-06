import axios from "axios";
import type { Product } from "@/store/cartStore";

const API_URL = "https://api.escuelajs.co/api/v1";

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

export const productService = {
  getProducts: async (limit = 24, offset = 0): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products?limit=${limit}&offset=${offset}`);
    return response.data.map(mapPlatziToProduct);
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return mapPlatziToProduct(response.data);
  },

  getCategories: async (): Promise<string[]> => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data.map((cat: any) => cat.name);
  }
};
