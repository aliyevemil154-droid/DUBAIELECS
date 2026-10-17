import { LocalizedText } from "@/components/language-provider";
import type { Metadata } from "next";
import { Suspense } from "react";
import OrderStatus from "@/components/order-status";
import "../checkout/checkout.css";

export const metadata: Metadata = {
  title: "Sifariş statusu",
  description: "Dubai Electronics sifarişinizin ödəniş statusunu yoxlayın.",
  robots: { index: false, follow: false },
};

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="checkout-loading">
          <LocalizedText>Checking your payment…</LocalizedText>
        </div>
      }
    >
      <OrderStatus />
    </Suspense>
  );
}
