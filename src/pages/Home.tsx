import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/products/ProductCard";

export default function Home() {
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-24 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] gap-8 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary">
            New Collection 2026
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50 block mt-2">Extraordinary</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Curated products for the modern lifestyle. Experience premium quality without compromise.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex gap-4"
        >
          <Link to="/products" className="h-12 px-8 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 font-medium transition-all hover:scale-105 active:scale-95">
            Shop Now
          </Link>
          <Link to="/categories" className="h-12 px-8 inline-flex items-center justify-center rounded-full border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium transition-all">
            Collections
          </Link>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Essentials</h2>
            <p className="text-muted-foreground mt-2">Handpicked for your everyday needs</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline hidden sm:block">
            View all products
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {isLoading && products.length === 0 ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-square rounded-2xl w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))
          ) : (
            featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
