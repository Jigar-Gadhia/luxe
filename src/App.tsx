import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
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

import { HomeSkeleton, ProductsSkeleton, ProductDetailSkeleton, CategoriesSkeleton } from "@/components/skeletons/PageSkeletons";

function App() {
  const location = useLocation();
  const { items } = useCartStore();
  
  // Global scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isCartOrCheckout = location.pathname === "/cart" || location.pathname === "/checkout";

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Suspense fallback={<HomeSkeleton />}>
                <Home />
              </Suspense>
            } />
            <Route path="products" element={
              <Suspense fallback={<ProductsSkeleton />}>
                <Products />
              </Suspense>
            } />
            <Route path="products/:id" element={
              <Suspense fallback={<ProductDetailSkeleton />}>
                <ProductDetail />
              </Suspense>
            } />
            <Route path="categories" element={
              <Suspense fallback={<CategoriesSkeleton />}>
                <Categories />
              </Suspense>
            } />
            <Route path="categories/:categoryId" element={
              <Suspense fallback={<ProductsSkeleton />}>
                <Category />
              </Suspense>
            } />
            <Route path="about" element={<Suspense><About /></Suspense>} />
            <Route path="search" element={<Suspense><Search /></Suspense>} />
            <Route path="account" element={<Suspense><Account /></Suspense>} />
            <Route path="contact" element={<Suspense><Contact /></Suspense>} />
            <Route path="faq" element={<Suspense><FAQ /></Suspense>} />
            <Route path="shipping" element={<Suspense><Shipping /></Suspense>} />
            <Route path="cart" element={<Suspense><Cart /></Suspense>} />
            <Route path="checkout" element={<Suspense><Checkout /></Suspense>} />
            <Route path="*" element={<Suspense><NotFound /></Suspense>} />
          </Route>
        </Routes>
      </AnimatePresence>

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
