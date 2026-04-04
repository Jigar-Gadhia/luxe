import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductStore } from "@/store/productStore";

export default function Categories() {
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  if (isLoading && products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-8">Shop by Category</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            // Find a product in this category to use as the cover image
            const product = products.find((p) => p.category === category);
            return (
              <Link key={category} to={`/categories/${category}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-card shadow-md hover:shadow-xl border border-border/50 hover:border-primary/50 transition-all cursor-pointer aspect-[4/3]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:from-black/90" />
                  {product?.image ? (
                    <img
                      src={product.image}
                      alt={category}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted/50" />
                  )}
                  <div className="absolute inset-0 z-20 flex items-end p-6 sm:p-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white capitalize tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {category}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
