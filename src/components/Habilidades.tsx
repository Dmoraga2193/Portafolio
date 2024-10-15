"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaJs,
  FaReact,
  FaNode,
  FaPython,
  FaDatabase,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import { DiDjango } from "react-icons/di";
import { RiNextjsFill } from "react-icons/ri";
import { IconType } from "react-icons";

interface Habilidad {
  name: string;
  icon: IconType;
  level: number;
}

const habilidades: Habilidad[] = [
  { name: "React", icon: FaReact, level: 85 },
  { name: "JavaScript", icon: FaJs, level: 80 },
  { name: "Node.js", icon: FaNode, level: 80 },
  { name: "NextJS", icon: RiNextjsFill, level: 80 },
  { name: "Python", icon: FaPython, level: 75 },
  { name: "Django", icon: DiDjango, level: 70 },
  { name: "HTML", icon: FaHtml5, level: 70 },
  { name: "CSS", icon: FaCss3Alt, level: 70 },
  { name: "GitHub", icon: FaGithub, level: 60 },
  { name: "SQL", icon: FaDatabase, level: 30 },
];

export default function Habilidades() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section id="habilidades" className="py-20">
      <div className="container mx-auto px-4 ">
        <h2 className="text-3xl font-bold mb-12 text-center ">Habilidades</h2>
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
            hidden: {},
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {habilidades.map((habilidad) => (
            <SkillCard key={habilidad.name} habilidad={habilidad} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface SkillCardProps {
  habilidad: Habilidad;
}

function SkillCard({ habilidad }: SkillCardProps) {
  const [hovering, setHovering] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (hovering) {
      const timer = setInterval(() => {
        setCount((oldCount) => {
          const newCount = oldCount + 1;
          if (newCount === habilidad.level) {
            clearInterval(timer);
          }
          return newCount > habilidad.level ? habilidad.level : newCount;
        });
      }, 20);
      return () => clearInterval(timer);
    } else {
      setCount(0);
    }
  }, [hovering, habilidad.level]);

  const circumference = 2 * Math.PI * 40; // 40 is the radius of the circle

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
          },
        },
      }}
    >
      <Card
        className="overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg dark:hover:shadow-primary/20"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted-foreground/20"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (count / 100) * circumference}
                className="text-primary transition-all duration-300"
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <habilidad.icon
                className="text-3xl"
                aria-label={habilidad.name}
              />
            </div>
          </div>
          <p className="mt-2 font-semibold">{habilidad.name}</p>
          {hovering && (
            <p className="text-sm font-bold mt-1 text-primary">{count}%</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
