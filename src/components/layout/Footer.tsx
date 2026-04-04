import { Link } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";

export default function Footer() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get unique categories (take up to 4 so it fits well in the footer)
  const categories = Array.from(new Set(products.map((p) => p.category))).slice(0, 4);

  return (
    <footer className="border-t bg-muted/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold tracking-tight text-xl">LUXE.</h3>
          <p className="text-sm text-muted-foreground">
            A premium e-commerce experience designed for the modern web.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-primary">All Products</Link></li>
            {categories.map((category) => (
              <li key={category}>
                <Link to={`/categories/${category}`} className="hover:text-primary capitalize">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQs</Link></li>
            <li><Link to="/shipping" className="hover:text-primary">Shipping & Returns</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Subscribe</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest updates and offers.
          </p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex-1"
            />
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-12 pt-8 border-t text-sm text-center text-muted-foreground">
        &copy; {new Date().getFullYear()} LUXE. All rights reserved.
      </div>
    </footer>
  );
}
