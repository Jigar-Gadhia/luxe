import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, CheckCircle2, CreditCard, Wallet } from "lucide-react";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeForm } from "@/components/checkout/StripeForm";
import { RazorpayButton } from "@/components/checkout/RazorpayButton";

import { useOrderStore } from "@/store/orderStore";
import type { Order } from "@/store/orderStore";

// Dummy test public key or use from env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_TYooMQauvdEDq54NiTphI7jx");

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  zipCode: z.string().min(4, "Zip code is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const { addOrder, updateContactDetails, contactDetails } = useOrderStore();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [gateway, setGateway] = useState<"stripe" | "razorpay">("stripe");

  const defaultValues = contactDetails || {
    firstName: "Premium",
    lastName: "Member",
    email: "premium.member@luxe.com",
    address: "7th Avenue, Fashion District",
    city: "New York",
    country: "United States",
    zipCode: "10001",
  };

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues
  });

  const handleSuccess = () => {
    const formValues = getValues();
    
    // Save contact details
    updateContactDetails(formValues);

    // Create and save order
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      total: total,
      date: new Date().toISOString(),
      status: "Confirmed"
    };

    addOrder(newOrder);
    setIsSuccess(true);
    clearCart();
    
    // Reset scroll to top so user sees the confirmation message
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateForm = async () => {
    // This triggers validation on all fields and displays errors without throwing
    return await trigger();
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-500">
        <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8 max-w-md text-lg">
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">You have nothing to checkout</h2>
        <Button asChild>
          <Link to="/products">Return to Store</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8 animate-in fade-in">
      <Link to="/cart" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Cart
      </Link>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        <div className="lg:col-span-7">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input placeholder="First Name" {...register("firstName")} />
                  {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Input placeholder="Last Name" {...register("lastName")} />
                  {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                </div>
                <div className="col-span-2 space-y-2">
                  <Input type="email" placeholder="Email Address" {...register("email")} />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 mt-8">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Input placeholder="Street Address" {...register("address")} />
                  {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
                </div>
                <div className="space-y-2">
                  <Input placeholder="City" {...register("city")} />
                  {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                  <Input placeholder="Country" {...register("country")} />
                  {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
                </div>
                <div className="space-y-2">
                  <Input placeholder="ZIP / Postal Code" {...register("zipCode")} />
                  {errors.zipCode && <p className="text-sm text-destructive">{errors.zipCode.message}</p>}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 mt-8">Payment Method</h2>
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setGateway("stripe")}
                  className={`flex-1 flex flex-col items-center justify-center p-4 border rounded-xl transition-all ${gateway === "stripe" ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-muted"}`}
                >
                  <CreditCard className={`h-6 w-6 mb-2 ${gateway === "stripe" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`font-medium ${gateway !== "stripe" && "text-muted-foreground"}`}>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGateway("razorpay")}
                  className={`flex-1 flex flex-col items-center justify-center p-4 border rounded-xl transition-all ${gateway === "razorpay" ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-muted"}`}
                >
                  <Wallet className={`h-6 w-6 mb-2 ${gateway === "razorpay" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`font-medium ${gateway !== "razorpay" && "text-muted-foreground"}`}>Razorpay</span>
                </button>
              </div>

              {gateway === "stripe" && (
                <Elements stripe={stripePromise}>
                  <StripeForm total={total} onSuccess={handleSuccess} onBeforeSubmit={validateForm} />
                </Elements>
              )}

              {gateway === "razorpay" && (
                <div className="pt-2">
                  <RazorpayButton total={total} onSuccess={handleSuccess} onBeforeSubmit={validateForm} />
                </div>
              )}
            </section>
          </form>
        </div>

        <div className="lg:col-span-5 bg-muted/30 rounded-3xl p-8 sticky top-24 border">
          <h2 className="text-xl font-bold tracking-tight mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {items.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="h-16 w-16 bg-white rounded-lg border p-1 relative flex-shrink-0">
                  <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-sm mt-6 border-t pt-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t mt-4">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
