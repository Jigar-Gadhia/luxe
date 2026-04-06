import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { CartItem } from "@/components/cart/CartItem";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const total = useMemo(() => 
    items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  [items]);

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
          
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
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
