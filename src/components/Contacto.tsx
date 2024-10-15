"use client";

import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contacto() {
  return (
    <section id="contacto" className="py-20 text-center ">
      <h2 className="text-3xl font-bold mb-8">Contactame !</h2>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="icon">
          <a
            href="https://github.com/Dmoraga2193"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <Github className="h-[1.2rem] w-[1.2rem]" />
          </a>
        </Button>
        <Button variant="outline" size="icon">
          <a
            href="https://www.linkedin.com/in/d-moraga-tenorio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-[1.2rem] w-[1.2rem]" />
          </a>
        </Button>
        <Button variant="outline" size="icon">
          <a href="mailto:d.moraga.tenorio@gmail.com" aria-label="Email Me">
            <Mail className="h-[1.2rem] w-[1.2rem]" />
          </a>
        </Button>
        <Button variant="outline" size="icon">
          <a href="https://www.instagram.com/dysast3r/" aria-label="Email Me">
            <Instagram className="h-[1.2rem] w-[1.2rem]" />
          </a>
        </Button>
      </div>
    </section>
  );
}
