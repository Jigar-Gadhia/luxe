import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="py-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
      >
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Redefining Premium E-Commerce</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience uncompromised quality and elegance. At LUXE., we curate the finest products for the modern lifestyle.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-[2.5rem] overflow-hidden shadow-2xl relative h-[400px] md:h-[500px]"
        >
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000" 
            alt="LUXE. Store" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-5xl font-bold tracking-widest opacity-80 mix-blend-overlay">LUXE.</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 pt-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We believe that shopping should be more than just a transaction—it should be an experience.
              Our vision is to provide a seamless, beautiful, and inspiring platform where quality meets exceptional design.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">Our Promise</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Every item in our collection is handpicked to ensure it meets our rigorous standards for craftsmanship.
              We are committed to delivering not just products, but lasting value and satisfaction.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
