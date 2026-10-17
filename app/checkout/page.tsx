import { LocalizedText } from "@/components/language-provider";
import type { Metadata } from "next";
import { Suspense } from "react";
import Checkout from "@/components/checkout";
import "./checkout.css";

export const metadata: Metadata = {
  title: "Sifarişi rəsmiləşdir",
  description:
    "Dubaydan Bakıya elektronika. Səbətinizi və çatdırılma məlumatlarını yoxlayın.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="checkout-loading">
          <LocalizedText>Preparing your checkout…</LocalizedText>
        </div>
      }
    >
      <Checkout />
    </Suspense>
  );
}
