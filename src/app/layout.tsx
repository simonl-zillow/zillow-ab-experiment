import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Seattle WA Real Estate - Seattle WA Homes For Sale | Zillow",
  description:
    "Zillow has 2,263 homes for sale in Seattle WA. View listing photos, review sales history, and use our detailed real estate filters to find the perfect place.",
  icons: {
    icon: "/seo/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-zillow-text font-sans">
        {children}
      </body>
    </html>
  );
}
