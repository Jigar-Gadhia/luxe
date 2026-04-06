import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";

export const useProducts = (limit = 24, offset = 0) => {
  return useQuery({
    queryKey: ["products", limit, offset],
    queryFn: () => productService.getProducts(limit, offset),
  });
};

export const useProduct = (id: number | string | undefined) => {
  const productId = typeof id === "string" ? parseInt(id) : id;
  
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProductById(productId as number),
    enabled: !!productId,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
  });
};
