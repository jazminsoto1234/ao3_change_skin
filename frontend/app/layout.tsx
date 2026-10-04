import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { StoreHydration } from "@/store/StoreHydration";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Make your AO3 pretty",
  description:
    "A focused skin & CSS customizer for Archive of Our Own: pick a preset, click anything in the preview to style it, and copy CSS ready to paste into AO3.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreHydration />
        {children}
      </body>
    </html>
  );
}
