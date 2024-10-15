"use client";

import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Contacto() {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Dmoraga2193",
      label: "GitHub Profile",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/d-moraga-tenorio/",
      label: "LinkedIn Profile",
    },
    {
      icon: Mail,
      href: "mailto:d.moraga.tenorio@gmail.com",
      label: "Email Me",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/dysast3r/",
      label: "Instagram Profile",
    },
  ];

  return (
    <section id="contacto" className="py-20 text-center ">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-12"
      >
        Contáctame
      </motion.h2>
      <div className="flex justify-center space-x-8">
        {socialLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full p-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
            >
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <link.icon className="h-8 w-8" />
              </motion.a>
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
