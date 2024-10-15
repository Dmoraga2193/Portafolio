"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Arquitectura next",
    description: "Pagina de regularizaciones de terrenos.",
    link: "https://arquitectura-next.vercel.app/",
    image: "/assets/images/arquitectosnext.png",
  },
  {
    title: "Consultas Abogados App",
    description: "Aplicacion de cotizacion de temas judiciales.",
    link: "https://consultas-abogados-app.vercel.app/",
    image: "/assets/images/consultalegal.png",
  },
  {
    title: "IngProtec",
    description: "Landing Page de una empresa ingeniera.",
    link: "https://ingprotec.cl/",
    image: "/assets/images/ingprotec.png",
  },
  {
    title: "Booksy",
    description: "Una biblioteca digital de libros.",
    link: "https://booksy-iota.vercel.app/",
    image: "/assets/images/booksy.png",
  },
];

export default function Proyectos() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  return (
    <section id="proyectos" className="py-20 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center ">Proyectos</h2>
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectCard project={projects[currentIndex]} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevProject}
              className="rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextProject}
              className="rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {projects.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
                index === currentIndex ? "bg-primary" : "bg-secondary"
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm mb-4">{project.description}</p>
            <Button asChild variant="secondary" className="w-fit">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Ver proyecto
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
