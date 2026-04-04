import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

interface StripeFormProps {
  total: number;
  onSuccess: () => void;
  onBeforeSubmit?: () => Promise<boolean>;
  disabled?: boolean;
}

export function StripeForm({ total, onSuccess, onBeforeSubmit, disabled }: StripeFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {    
    if (onBeforeSubmit) {
      const isValid = await onBeforeSubmit();
      if (!isValid) return;
    }

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Grab the Card Element
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsProcessing(false);
      return;
    }
    
    // We are mocking a backend PaymentIntent success by generating a frontend token/paymentMethod
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message ?? "An unknown error occurred");
      setIsProcessing(false);
    } else {
      console.log("Stripe PaymentMethod created successfully", paymentMethod);
      // Simulate backend processing time
      setTimeout(() => {
        setIsProcessing(false);
        onSuccess();
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-card border rounded-xl shadow-sm">
        <label className="block text-sm font-medium mb-4 text-foreground">Credit Card Details (Stripe API)</label>
        <div className="p-4 border rounded-md bg-background">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#000000',
                  iconColor: '#000000',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                  iconColor: '#9e2146',
                },
              },
            }} 
          />
        </div>
        {error && <p className="text-sm text-destructive mt-3">{error}</p>}
      </div>

      <Button 
        type="button" 
        onClick={handleSubmit} 
        size="lg" 
        disabled={!stripe || disabled || isProcessing} 
        className="w-full h-14 rounded-xl text-base shadow-lg bg-[#635BFF] hover:bg-[#524BDE] text-white"
      >
        {isProcessing ? "Processing Payment..." : `Pay $${total.toFixed(2)} Securely`}
      </Button>
    </div>
  );
}
