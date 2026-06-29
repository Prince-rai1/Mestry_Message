import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Outfit } from "next/font/google";
import AuthProvider from '@/context/AuthProvider'

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mestry Message",
  description: "Anonymous messaging platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.className} h-full antialiased`}
      suppressHydrationWarning
    > 
      <body className="min-h-full flex flex-col bg-linear-to-br
  from-gray-800
  via-gray-900
  to-black">
        <AuthProvider>
        {children}
        <Toaster />  
        </AuthProvider>
      </body>
    </html>
  );
}