import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Layout from "@/components/layout/Layout";

const Home = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Categories = lazy(() => import("@/pages/Categories"));
const Category = lazy(() => import("@/pages/Category"));
const About = lazy(() => import("@/pages/About"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Search = lazy(() => import("@/pages/Search"));
const Account = lazy(() => import("@/pages/Account"));
const Contact = lazy(() => import("@/pages/Contact"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Shipping = lazy(() => import("@/pages/Shipping"));

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

function App() {
  const location = useLocation();
  const { items } = useCartStore();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isCartOrCheckout = location.pathname === "/cart" || location.pathname === "/checkout";
  
  return (
    <div className="relative min-h-screen">
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:categoryId" element={<Category />} />
              <Route path="about" element={<About />} />
              <Route path="search" element={<Search />} />
              <Route path="account" element={<Account />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>

      {/* Global Floating Action Cart - Outside transition context for mobile stability */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOrCheckout && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999]"
          >
            <Link 
              to="/cart"
              className="flex items-center justify-center gap-3 bg-black text-white w-14 h-14 sm:w-auto sm:h-auto sm:px-6 sm:py-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-transform group border border-white/10"
            >
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <motion.span 
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-3 -right-3 h-5 w-5 bg-primary text-primary-foreground rounded-full text-[10px] font-black flex items-center justify-center border-2 border-black"
                >
                  {cartCount}
                </motion.span>
              </div>
              <span className="font-bold text-sm uppercase tracking-widest hidden sm:block">View Cart</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
