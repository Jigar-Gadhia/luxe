import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in">
        <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Trash2 className="h-10 w-10 text-muted-foreground opacity-50" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Let's change that!
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link to="/products">Explore Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8 animate-in fade-in">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium text-muted-foreground uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>
          
          <AnimatePresence>
            {items.map((item: any) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, height: 0 }}
                transition={{ duration: 0.2 }}
                className="grid md:grid-cols-12 gap-4 items-center py-4 border-b last:border-0"
              >
                <div className="col-span-6 flex items-center gap-4">
                  <div className="h-24 w-24 bg-white rounded-xl border p-2 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <Link to={`/products/${item.id}`} className="font-medium hover:underline line-clamp-2 leading-snug mb-1">
                      {item.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-destructive hover:underline flex items-center gap-1 mt-2 w-fit font-medium"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
                
                <div className="col-span-3 flex items-center md:justify-center mt-4 md:mt-0">
                  <div className="flex items-center border rounded-full overflow-hidden bg-background">
                    <button 
                      className="px-3 py-1.5 hover:bg-muted font-medium transition-colors"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      className="px-3 py-1.5 hover:bg-muted font-medium transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-3 text-right font-semibold md:mt-0">
                  <span className="md:hidden text-sm text-muted-foreground mr-2 font-normal">Total:</span>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4 bg-muted/30 rounded-3xl p-8 sticky top-24 border">
          <h2 className="text-xl font-bold tracking-tight mb-6">Order Summary</h2>
          
          <div className="space-y-4 text-sm mb-6 border-b pb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-2xl text-primary">${total.toFixed(2)}</span>
          </div>
          
          <Button asChild size="lg" className="w-full h-14 rounded-full shadow-lg text-base group transition-all hover:scale-[1.02]">
            <Link to="/checkout" className="flex items-center justify-between px-6">
              <span>Checkout</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
