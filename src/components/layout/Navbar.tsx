import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Search, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { motion } from "framer-motion";

export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-background/80 supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">LUXE.</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              About
            </NavLink>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/search" className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Link>
          
          <Link to="/account" className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>
          
          <Link
            to="/cart"
            className="p-2 text-muted-foreground hover:text-primary transition-colors relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
              >
                {cartCount}
              </motion.span>
            )}
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
