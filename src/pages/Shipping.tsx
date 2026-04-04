import { motion } from "framer-motion";
import { Truck, RefreshCcw, ShieldCheck } from "lucide-react";

export default function Shipping() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Shipping & Returns</h1>
          <p className="text-muted-foreground">Everything you need to know about getting your items.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 pt-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card border rounded-3xl p-8 text-center space-y-4 shadow-sm"
          >
            <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">Complimentary express shipping on all domestic orders over $200.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-card border rounded-3xl p-8 text-center space-y-4 shadow-sm"
          >
            <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <RefreshCcw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Easy Returns</h3>
            <p className="text-sm text-muted-foreground">Not quite right? Return it within 30 days for a full refund.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-card border rounded-3xl p-8 text-center space-y-4 shadow-sm"
          >
            <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Secure Transit</h3>
            <p className="text-sm text-muted-foreground">Every package is fully insured from our warehouse to your doorstep.</p>
          </motion.div>
        </div>

        <div className="pt-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Domestic Shipping</h2>
            <div className="prose text-muted-foreground max-w-none">
              <p>Standard delivery takes 3-5 business days. Expedited shipping is available at checkout for 1-2 day delivery. Orders placed before 2 PM EST are processed the same business day.</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">International Shipping</h2>
            <div className="prose text-muted-foreground max-w-none">
              <p>We currently ship to over 50 countries globally. International shipping timelines vary based on location but generally fall between 7-14 business days. Please be aware that import duties, taxes, and charges are not included in the item price or shipping cost.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
