"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import StarfieldBackground from "@/components/StarfieldBackground";
import { ThemeProvider, useTheme } from "@/components/ThemeContext";
import FloatingCounter from "@/components/FloatingCounter";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ThemedLayout>{children}</ThemedLayout>
    </ThemeProvider>
  );
}

// Extraemos la lógica en un componente separado para evitar errores
function ThemedLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme(); // Ahora esto se llama dentro del proveedor

  return (
    <html lang="en" className={`scroll-smooth ${theme}`}>
      <head>
        <title>Daniel - Developer</title>
        <link rel="icon" href="/assets/images/favicon.png" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <StarfieldBackground />
        <FloatingCounter />
        <Toaster />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
