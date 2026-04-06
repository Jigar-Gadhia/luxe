import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cartStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Star, ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const addItem = useCartStore(state => state.addItem);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const itemCount = useCartStore(state =>
    state.items.find((item) => item.id === (product?.id))?.quantity || 0
  );

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isError) {
      navigate("/404", { replace: true });
    }
  }, [isError, navigate]);

  const handleAddToCart = () => {
    if (product) {
      setIsAdding(true);
      addItem(product);
      setTimeout(() => setIsAdding(false), 600);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product) addItem(product);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product) {
      if (itemCount === 1) {
        removeItem(product.id);
      } else {
        updateQuantity(product.id, itemCount - 1);
      }
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
        <m.div
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
        </m.div>

        <m.div
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
            <div className="min-h-[56px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {itemCount > 0 ? (
                  <m.div
                    key="quantity-controls"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-between w-full bg-black text-white h-14 rounded-full px-4 shadow-xl"
                  >
                    <button
                      onClick={handleDecrement}
                      className="h-10 w-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    
                    <div className="flex flex-col items-center justify-center">
                      <AnimatePresence mode="popLayout">
                        <m.span
                          key={itemCount}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          className="text-xl font-black"
                        >
                          {itemCount}
                        </m.span>
                      </AnimatePresence>
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">In Cart</span>
                    </div>

                    <button
                      onClick={handleIncrement}
                      className="h-10 w-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </m.div>
                ) : (
                  <Button
                    size="lg"
                    className="w-full h-14 text-base rounded-full shadow-lg transition-all active:scale-95 group uppercase tracking-widest font-black"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                  >
                    {isAdding ? (
                      <m.div
                        key="adding"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-5 w-5" />
                        Adding...
                      </m.div>
                    ) : (
                      <m.div
                        key="add-to-cart"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Add to Cart
                      </m.div>
                    )}
                  </Button>
                )}
              </AnimatePresence>
            </div>

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
        </m.div>
      </div>
    </div>
  );
}
