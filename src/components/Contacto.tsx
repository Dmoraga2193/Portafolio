"use client";

import { useState } from "react";
import {
  CheckIcon,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

export default function Contacto() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        toast({
          title: "¡Mensaje Enviado!",
          description: (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-lg bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
              >
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Gracias por contactarme. Te responderé pronto.
                </motion.p>
                <motion.div
                  className="mt-2 flex justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.4,
                  }}
                >
                  <span className="inline-block bg-green-500 rounded-full p-2">
                    <CheckIcon className="w-6 h-6 text-white" />
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          ),
          duration: 5000,
        });

        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Error al enviar el mensaje");
      }
    } catch (error: unknown) {
      console.error("Error sending message:", error);
      toast({
        title: "Error al enviar",
        description:
          "Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      className="py-20 relative overflow-hidden rounded-lg  backdrop-blur-sm"
    >
      <div className="relative z-10 container mx-auto px-4 ">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Contáctame
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <p className="text-lg text-muted-foreground">
              ¿Tienes alguna pregunta o propuesta? No dudes en contactarme a
              través de mis redes sociales o utilizando el formulario.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full p-3 bg-background/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                  >
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <link.icon className="h-6 w-6" />
                    </motion.a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4 bg-background/50 backdrop-blur-sm p-6 rounded-lg shadow-lg"
          >
            <Input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="transition-all duration-300 focus:ring-2 focus:ring-primary"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="transition-all duration-300 focus:ring-2 focus:ring-primary"
            />
            <Textarea
              placeholder="Mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="min-h-[100px] transition-all duration-300 focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              className="w-full relative overflow-hidden group"
              disabled={isSubmitting}
            >
              <span className="relative z-10">
                {isSubmitting ? "Enviando..." : "Enviar"}
              </span>
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ width: "100%" }}
                animate={{ width: isSubmitting ? "0%" : "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <Send className="ml-2 h-4 w-4 relative z-10" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
