import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const jet = JetBrains_Mono({ variable: "--font-jet", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://adityanarkar.dev"),
  title: "Aditya Narkar - Full-stack Developer",
  description:
    "Aditya Narkar, full-stack developer in Mumbai. 2+ years building fast, scalable web experiences with React, Next.js, the MERN stack, and Shopify.",
  openGraph: {
    title: "Aditya Narkar - Full-stack Developer",
    description: "Full-stack developer crafting high-performance interfaces across e-commerce and SaaS.",
    type: "website",
  },
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23810100'/%3E%3Ctext x='16' y='22' font-family='Space Grotesk,Arial,sans-serif' font-size='16' font-weight='700' fill='%23EDEBDD' text-anchor='middle'%3EAN%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space.variable} ${manrope.variable} ${jet.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
