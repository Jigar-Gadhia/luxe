import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/store/cartStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Star, ShoppingCart, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchProductById, isLoading } = useProductStore();
  const addItem = useCartStore((state: any) => state.addItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id)).then((data: any) => {
        if (data) setProduct(data);
        else navigate("/404", { replace: true });
      });
    }
  }, [id, fetchProductById, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (isLoading || !product) {
    return (
      <div className="grid md:grid-cols-2 gap-12 py-8 animate-in fade-in">
        <Skeleton className="aspect-square rounded-3xl w-full" />
        <div className="flex flex-col gap-6 pt-8">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-1/4" />
          <div className="space-y-2 mt-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 animate-in fade-in duration-500">
      <Link to="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-square bg-white rounded-[3rem] overflow-hidden border shadow-sm p-12 flex items-center justify-center sticky top-24"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded-[2.5rem]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-8 pt-4 md:pt-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="uppercase tracking-wider text-xs font-semibold px-3 py-1">
                {product.category}
              </Badge>
              <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>{product.rating.rate}</span>
                <span className="text-muted-foreground">({product.rating.count} reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">{product.title}</h1>
            <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
          </div>

          <div className="prose prose-sm sm:prose-base text-muted-foreground leading-relaxed">
            <p>{product.description}</p>
          </div>

          <div className="flex flex-col gap-4 mt-4 border-t pt-8">
            <Button
              size="lg"
              className="w-full h-14 text-base rounded-full shadow-lg transition-all"
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.div
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            <div className="grid grid-cols-2 gap-4 text-sm text-center pt-4">
              <div className="p-4 bg-muted/30 rounded-xl">
                <span className="block font-semibold mb-1">Free Shipping</span>
                <span className="text-muted-foreground">On orders over $50</span>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl">
                <span className="block font-semibold mb-1">Easy Returns</span>
                <span className="text-muted-foreground">30 days return policy</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
