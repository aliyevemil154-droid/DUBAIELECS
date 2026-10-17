import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import "./products.css";
import "./navigation.css";
import { LanguageProvider } from "@/components/language-provider";

export const metadata: Metadata = {
  title: {
    default: "Dubai Electronics — Yeni texnologiyalar, Dubaydan Bakıya",
    template: "%s | Dubai Electronics",
  },
  description:
    "Smartfonlar, noutbuklar, audio və gündəlik elektronika. Dubai Electronics ilə seçilmiş texnologiyalar Dubaydan Bakıya.",
  applicationName: "Dubai Electronics",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Dubai Electronics",
    description: "Mükəmməl texnologiyalar. Dubaydan Bakıya.",
    type: "website",
    locale: "az_AZ",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#173e32",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
