"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "../ui/button";

type props = {
  priceId: string;
};
const PremiumButton = ({ priceId }: props) => {
  const handleSubmit = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );
    if (!stripe) {
      return;
    }
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      if (!data.ok) throw new Error("Something went wrong");
      await stripe.redirectToCheckout({
        sessionId: data.result.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button className="w-full" onClick={handleSubmit}>
      Upgrade to Premium
    </Button>
  );
};
export default PremiumButton;
