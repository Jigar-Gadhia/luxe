import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { m } from "framer-motion";
import { memo } from "react";
import { useCartStore, type CartItem as CartItemType } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = memo(function CartItem({ item }: CartItemProps) {
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <m.div 
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
    </m.div>
  );
});
