import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "ASHOR – Assyrische Hochschulgruppe Rhein-Main",
  description: "ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V. Identität. Bildung. Gemeinschaft.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
