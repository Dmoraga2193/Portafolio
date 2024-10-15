"use client";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="py-6 text-center">
      <p>&copy; 2024 Daniel Moraga. Todos los derechos reservados.</p>
      <motion.div
        className="absolute bottom-4 right-4 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="bg-primary text-primary-foreground rounded-full p-2">
          <ChevronUp className="h-6 w-6" />
        </div>
        {isHovered && (
          <motion.div
            className="absolute bottom-full mb-2 right-0 bg-primary text-primary-foreground text-sm py-1 px-2 rounded"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Volver arriba
          </motion.div>
        )}
      </motion.div>
    </footer>
  );
}
