import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/products/ProductCard";

export default function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle case sensitivity/URL encoding
  const decodedCategory = decodeURIComponent(categoryId || "");
  
  // Filter products by category (case-insensitive substring match to handle variations)
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase().includes(decodedCategory.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto py-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight capitalize">{decodedCategory}</h1>
        <p className="text-muted-foreground mt-2">Explore products in this category.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {isLoading && products.length === 0 ? (
          Array(8).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="aspect-square rounded-2xl w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))
        ) : (
          filteredProducts.map((product: any, index: number) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        )}
      </div>

      {!isLoading && filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-lg font-medium">No active products found</h3>
          <p className="text-muted-foreground mt-2">Currently there are no products available in the "{decodedCategory}" category.</p>
          <Link to="/products" className="inline-block mt-4 text-primary hover:underline font-medium">
            &larr; View all products
          </Link>
        </div>
      )}
    </div>
  );
}
