import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We'd love to hear from you. Have a question about an order, our products, or anything else? Send us a message.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 pt-8">
          <div className="bg-card border rounded-3xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input type="text" className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm focus-visible:ring-1 focus-visible:ring-primary outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input type="text" className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm focus-visible:ring-1 focus-visible:ring-primary outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input type="email" className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm focus-visible:ring-1 focus-visible:ring-primary outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea rows={5} className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm focus-visible:ring-1 focus-visible:ring-primary outline-none transition-all resize-none"></textarea>
              </div>
              <button type="button" className="w-full bg-primary text-primary-foreground h-12 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-md">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8 md:pl-8">
            <div>
              <h3 className="text-xl font-bold mb-4 border-l-4 border-primary pl-4">Our Offices</h3>
              <div className="space-y-6 text-muted-foreground mt-6">
                <div className="flex items-start gap-4">
                  <MapPin className="top-1 relative text-primary w-5 h-5 flex-shrink-0" />
                  <div>
                    <strong className="block text-foreground font-medium mb-1">Headquarters</strong>
                    123 Luxe Avenue, Suite 100<br />
                    New York, NY 10001
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-primary w-5 h-5 flex-shrink-0" />
                  <span>+1 (800) 123-LUXE</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-primary w-5 h-5 flex-shrink-0" />
                  <span>support@luxestore.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
