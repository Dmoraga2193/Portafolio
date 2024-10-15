"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import StarfieldBackground from "@/components/StarfieldBackground";

import { createContext, useState, useContext } from "react";
import { ThemeProvider } from "@/components/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

const ThemeContext = createContext<{
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}>({
  theme: "light",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <html lang="en" className={`scroll-smooth ${theme}`}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <body className={`${inter.className} min-h-screen`}>
          <ThemeProvider>
            <StarfieldBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </ThemeContext.Provider>
    </html>
  );
}
