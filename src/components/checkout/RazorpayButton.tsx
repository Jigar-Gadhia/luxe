import { useState } from "react";
import { Button } from "@/components/ui/button";
import { loadRazorpay } from "@/lib/loadRazorpay";

interface RazorpayButtonProps {
  total: number;
  onSuccess: () => void;
  onBeforeSubmit?: () => Promise<boolean>;
  disabled?: boolean;
}

export function RazorpayButton({ total, onSuccess, onBeforeSubmit, disabled }: RazorpayButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const displayRazorpay = async () => {
    if (onBeforeSubmit) {
      const isValid = await onBeforeSubmit();
      if (!isValid) return;
    }

    setIsLoading(true);
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsLoading(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_TYooMQauvdEDq54NiTphI7jx", // Use env var or fallback to test key format
      amount: Math.round(total * 100), // convert to smallest currency unit (paise)
      currency: "USD",
      name: "LUXE.",
      description: "Premium Order",
      handler: function (response: any) {
        console.log("Razorpay Success:", response);
        onSuccess();
        setIsLoading(false);
      },
      prefill: {
        name: "Valued Customer",
        email: "hello@luxe.com",
        contact: "9999999999",
      },
      notes: {
        address: "Luxe Corporate Office",
      },
      theme: {
        color: "#000000",
      },
      modal: {
        ondismiss: function () {
          setIsLoading(false);
        },
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <Button 
      type="button" 
      size="lg" 
      onClick={displayRazorpay} 
      disabled={disabled || isLoading} 
      className="w-full h-14 rounded-xl text-base shadow-lg bg-[#3395FF] hover:bg-[#2B7DE6] text-white"
    >
      {isLoading ? "Loading Razorpay..." : `Pay $${total.toFixed(2)} with Razorpay`}
    </Button>
  );
}
