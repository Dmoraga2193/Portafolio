"use client";

import SobreMi from "@/components/SobreMi";
import Habilidades from "@/components/Habilidades";
import Contacto from "@/components/Contacto";
import Proyectos from "@/components/Proyectos";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <div className=" text-foreground transition-colors duration-300">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Navbar />
        </header>

        <main className="">
          <Hero />
          <SobreMi />
          {/* Nueva sección de dos columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Habilidades />
            </div>
            <div>
              <Proyectos />
            </div>
          </div>
          <Contacto />
        </main>

        <Footer />
      </div>
    </div>
  );
}
