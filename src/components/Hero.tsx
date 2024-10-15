"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const phrases = ["Desarrollador Full Stack"];

export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-primary">
          {text}
          <span className="animate-pulse">|</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transformando ideas en experiencias digitales excepcionales
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="default">
            <Link href="#proyectos">Ver proyectos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#contacto">Contactar</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
