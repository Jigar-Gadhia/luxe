import { motion } from "framer-motion";
import { Mail, User, Package, MapPin, ExternalLink, LogOut } from "lucide-react";
import { useOrderStore } from "@/store/orderStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Account() {
  const { orders, contactDetails, clearHistory } = useOrderStore();

  // Dummy default details if no real checkout has happened
  const dummyDetails = {
    firstName: "Premium",
    lastName: "Member",
    email: "premium.member@luxe.com",
    address: "7th Avenue, Fashion District",
    city: "New York",
    zipCode: "10001",
    country: "United States"
  };

  const displayDetails = contactDetails || dummyDetails;

  const handleClear = () => {
    if (confirm("Reset account session? This will clear your current session orders.")) {
      clearHistory();
    }
  };

  return (
    <div className="py-8 animate-in fade-in duration-500 max-w-6xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-16 md:h-24 md:w-24 rounded-3xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-inner group overflow-hidden">
            <User className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {displayDetails.firstName} {displayDetails.lastName}
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1 font-medium">
              <Mail className="h-4 w-4" /> {displayDetails.email}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleClear} className="rounded-full flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Reset Session
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Profile Details */}
        <div className="lg:col-span-1 space-y-8 text-sm">
          <section className="bg-card border rounded-3xl p-8 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 italic relative">
              <MapPin className="h-5 w-5 text-primary" /> Shipping Identity
            </h2>
            <div className="space-y-4 text-muted-foreground relative">
              <p className="font-bold text-foreground text-base">{displayDetails.firstName} {displayDetails.lastName}</p>
              <p className="font-medium">{displayDetails.address}</p>
              <p className="font-medium">{displayDetails.city}, {displayDetails.zipCode}</p>
              <p className="font-medium">{displayDetails.country}</p>
            </div>
            <Button variant="link" className="px-0 mt-6 text-primary font-bold hover:no-underline hover:opacity-80">Edit Profile</Button>
          </section>

          <section className="bg-primary/5 border border-primary/10 rounded-3xl p-8 relative overflow-hidden group">
             <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-primary/5 rounded-tl-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            <h2 className="text-lg font-bold mb-2">LUXE Tier</h2>
            <p className="text-muted-foreground mb-4 font-medium">Elevate your experience with every purchase.</p>
            <div className="w-full bg-primary/10 h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[45%]" />
            </div>
            <div className="flex justify-between mt-3 items-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Silver Status</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Gold at 1000 pts</p>
            </div>
          </section>
        </div>

        {/* Past Orders */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <Package className="h-6 w-6 text-primary" /> Session History
          </h2>
          
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={order.id}
                  className="bg-card border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                          {order.status}
                        </span>
                        <span className="text-xs text-muted-foreground font-bold">
                          {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold tracking-tight mb-4">{order.id}</h3>
                      
                      <div className="flex flex-wrap gap-3">
                        {order.items.slice(0, 4).map((item) => (
                          <div key={item.id} className="h-16 w-16 bg-white border rounded-2xl p-2 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                          </div>
                        ))}
                        {order.items.length > 4 && (
                          <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center text-xs font-bold text-muted-foreground border border-dashed">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-start md:items-end gap-2 shrink-0 md:border-l md:pl-8 md:min-w-[140px]">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Amount</p>
                      <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                      <Button variant="outline" size="sm" className="rounded-full mt-2 font-bold px-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        View <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-muted/20 border-2 border-dashed rounded-[3rem] py-20 px-8 text-center flex flex-col items-center gap-4">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                <Package className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">No Orders Yet</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">Your session order history is empty. Start shopping to see your confirmed orders here.</p>
              </div>
              <Button asChild className="rounded-full px-8 mt-2 shadow-lg shadow-primary/20">
                <Link to="/products">Go Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

