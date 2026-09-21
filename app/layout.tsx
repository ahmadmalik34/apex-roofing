import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getConfig } from "@/app/actions/config";
import { SiteConfigProvider } from "@/app/SiteConfigProvider";
import ThemeApplier from "@/app/ThemeApplier";
import Watermark from "@/app/Watermark";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex Roofing",
  description: "Professional roofing services",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const config = await getConfig();

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteConfigProvider config={config}>
          <ThemeApplier />
          <Watermark />
          {children}
        </SiteConfigProvider>
      </body>
    </html>
  );
}
