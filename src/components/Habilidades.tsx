"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
    <section id="habilidades">
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center text-shadow shadow-black/20 ">
          Habilidades
        </h2>
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {habilidades.map((habilidad) => (
            <SkillItem key={habilidad.name} habilidad={habilidad} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillItem({ habilidad }: { habilidad: Habilidad }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
          },
        },
      }}
      className="flex items-center space-x-4"
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <habilidad.icon className="text-2xl text-primary dark:text-white" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-sm">{habilidad.name}</span>
          <span className="text-xs text-muted-foreground">
            {habilidad.level}%
          </span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${habilidad.level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
