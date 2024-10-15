"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
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
  return (
    <section id="proyectos" className="py-20 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Proyectos</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div
              className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-white p-4">
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {project.title}
                </h3>
                <p className="text-sm text-center mb-4">
                  {project.description}
                </p>
                <Button asChild variant="secondary">
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
