import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import Fuse from "fuse.js";
import { Skeleton } from "@/components/ui/skeleton";

import { ProductCard } from "@/components/products/ProductCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const { products, fetchProducts, isLoading } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const fuse = new Fuse(products, {
      keys: ["title", "category", "description"],
      threshold: 0.3,
    });
    
    const results = fuse.search(query);
    setFilteredProducts(results.map(r => r.item));
  }, [query, products]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 rounded-full border border-input bg-card/50 text-base focus:bg-card focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
            placeholder="Search for products, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {isLoading && query.trim() !== "" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-square rounded-2xl w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && query.trim() !== "" && filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground pt-16 pb-8"
          >
            <div className="inline-flex w-16 h-16 bg-muted rounded-full items-center justify-center mb-4">
              <SearchIcon className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No results found</h3>
            <p>We couldn't find anything matching "{query}". Try adjusting your search criteria.</p>
          </motion.div>
        )}

        {!isLoading && filteredProducts.length > 0 && (
          <div className="space-y-6 pt-8">
             <h2 className="text-xl font-semibold border-b pb-2">Results ({filteredProducts.length})</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {filteredProducts.map((product: any, index: number) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
