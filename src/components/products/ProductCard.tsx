import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useCartStore, type Product } from "@/store/cartStore";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [isPeeking, setIsPeeking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const peekTimerRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { items, addItem, removeItem, updateQuantity } = useCartStore();
  const itemCount = items.find((item) => item.id === product.id)?.quantity || 0;

  const handleIncrement = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleDecrement = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (itemCount === 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, itemCount - 1);
    }
  };

  const startPeek = () => {
    // Only trigger full visual peek (dimming/zoom) on desktop
    if (!isMobile) {
      setIsPeeking(true);
    }
    // Subtle haptic touch for all devices
    if (window.navigator.vibrate) window.navigator.vibrate(5);
  };

  const stopPeek = () => {
    if (peekTimerRef.current) clearTimeout(peekTimerRef.current);
    setIsPeeking(false);
  };

  return (
    <>
      {/* iOS Background Dimming Overlay - Desktop Only */}
      <AnimatePresence>
        {isPeeking && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/[0.08] backdrop-blur-[2px] z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: Math.min(index * 0.05, 0.3) }}
        onMouseEnter={() => !isMobile && startPeek()}
        onMouseLeave={stopPeek}
        onTouchStart={startPeek}
        onTouchEnd={stopPeek}
        className={`group relative flex flex-col bg-white rounded-[2.5rem] p-2 transition-all duration-500 cursor-pointer ${isPeeking && !isMobile ? "z-[101] shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] scale-[1.04]" : "hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]"
          }`}
      >
        <Link
          to={`/products/${product.id}`}
          className="relative aspect-square w-full rounded-[2.1rem] overflow-hidden bg-zinc-50/80 group-hover:bg-zinc-100/50 transition-colors duration-700"
        >
          <div className="absolute inset-0 p-8 flex items-center justify-center">
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl rounded-[2rem]"
              loading="lazy"
              animate={isPeeking ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
          </div>

          {/* Quick Action Chip (Bottom) */}
          <AnimatePresence>
            {(isPeeking || itemCount > 0 || isMobile) && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-x-4 bottom-4 z-50 flex justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-black text-white rounded-full min-h-[44px] shadow-2xl border border-white/10 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {itemCount > 0 ? (
                      <motion.div
                        key="controls"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center px-2.5 h-11"
                      >
                        <button onClick={handleDecrement} className="h-8 w-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"><Minus className="h-4 w-4" /></button>
                        <div className="w-10 flex justify-center overflow-hidden">
                          <AnimatePresence mode="popLayout">
                            <motion.span
                              key={itemCount}
                              initial={{ y: 15, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -15, opacity: 0 }}
                              className="font-black text-xs block"
                            >
                              {itemCount}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                        <button onClick={handleIncrement} className="h-8 w-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"><Plus className="h-4 w-4" /></button>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="add-btn"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={handleIncrement}
                        className="px-8 h-11 font-black text-[11px] uppercase tracking-widest whitespace-nowrap"
                      >
                        Quick Add
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Badge (Top Left) */}
          <div className="absolute top-4 left-4 flex gap-1.5 overflow-hidden">
            {product.price > 100 && (
              <span className="bg-black text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-widest uppercase shadow-lg">Premium</span>
            )}
            <span className="bg-white/80 backdrop-blur-md text-black text-[9px] font-black px-2.5 py-1 rounded-full tracking-widest uppercase shadow-lg border border-black/5">New</span>
          </div>
        </Link>

        <div className="px-5 pt-5 pb-5 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.25em]">
              {product.category}
            </p>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className={`h-1 w-2 rounded-full ${i < Math.round(product.rating.rate) ? "bg-primary" : "bg-zinc-100"}`} />
                ))}
              </div>
              <p className="text-[10px] font-black text-zinc-300">({product.rating.count})</p>
            </div>
          </div>

          <h3 className="font-extrabold text-lg leading-[1.25] tracking-tight text-zinc-900 group-hover:text-primary transition-colors duration-300">
            <Link to={`/products/${product.id}`} className="block line-clamp-2 min-h-[48px]">
              {product.title}
            </Link>
          </h3>

          <div className="flex items-center gap-3 pt-1">
            <p className="text-2xl font-black tracking-tighter text-black">${product.price.toFixed(2)}</p>
            {product.price > 100 && (
              <p className="text-[10px] text-zinc-400 font-bold italic line-through opacity-50">${(product.price * 1.2).toFixed(2)}</p>
            )}
          </div>

        </div>
      </motion.div>
    </>
  );
}
