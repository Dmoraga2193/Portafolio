"use client";

import { useState, ReactNode, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User, GraduationCap, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EducationItem {
  title: string;
  institution: string;
  period: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
}

type TimelineItem = EducationItem | ExperienceItem;

interface TimelineProps {
  items: TimelineItem[];
  icon: ReactNode;
}

export default function SobreMi() {
  const [activeTab, setActiveTab] = useState("educacion");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="sobremi" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          Conóceme
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <motion.div
            className="w-full lg:w-1/3 lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Avatar className="w-48 h-48 mx-auto ring-4 ring-primary/20 transition-all duration-300 hover:ring-primary">
                <AvatarImage src="/assets/images/Anime.jpg" alt="Daniel M." />
                <AvatarFallback>DM</AvatarFallback>
              </Avatar>
            </motion.div>
            <Card className="mt-8 transition-all duration-300 hover:shadow-lg  backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <User className="mr-2 text-primary" />
                  <h3 className="text-lg font-semibold">
                    Información Personal
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Hola, me llamo Daniel, apasionado a la programación hace 1
                  año. Me encanta crear soluciones innovadoras y aprender nuevas
                  tecnologías. Cuando no estoy programando, me puedes encontrar
                  jugando o paseando en bicicleta.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className="w-full lg:w-2/3"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-muted rounded-full">
                <TabsTrigger
                  value="educacion"
                  className={`text-lg rounded-full transition-all duration-300 ${
                    activeTab === "educacion"
                      ? "bg-background text-foreground shadow-lg"
                      : "text-muted-foreground"
                  }`}
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Educación
                </TabsTrigger>
                <TabsTrigger
                  value="experiencia"
                  className={`text-lg rounded-full transition-all duration-300 ${
                    activeTab === "experiencia"
                      ? "bg-background text-foreground shadow-lg"
                      : "text-muted-foreground"
                  }`}
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Experiencia
                </TabsTrigger>
              </TabsList>
              <TabsContent value="educacion">
                <Card className="bg-white/10 backdrop-blur-md">
                  <CardContent className="pt-6">
                    <Timeline
                      items={educationItems}
                      icon={<GraduationCap size={20} />}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="experiencia">
                <Card className="bg-white/10 backdrop-blur-md">
                  <CardContent className="pt-6">
                    <Timeline
                      items={experienceItems}
                      icon={<Briefcase size={20} />}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Timeline({ items, icon }: TimelineProps) {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          item={item}
          icon={icon}
          index={index}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}

function TimelineItem({
  item,
  icon,
  index,
  isLast,
}: {
  item: TimelineItem;
  icon: ReactNode;
  index: number;
  isLast: boolean;
}) {
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
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -50 },
      }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex"
    >
      <div className="mr-4 relative">
        <motion.div
          className="bg-primary text-primary-foreground rounded-full p-2"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        {!isLast && (
          <motion.div
            className="absolute top-10 bottom-0 left-1/2 w-0.5 bg-primary/20 transform -translate-x-1/2"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          />
        )}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-semibold">{item.title}</h4>
        <p className="text-muted-foreground">
          {"institution" in item ? item.institution : item.company}
        </p>
        {item.period && (
          <p className="text-sm text-muted-foreground">{item.period}</p>
        )}
      </div>
    </motion.div>
  );
}

const educationItems: EducationItem[] = [
  {
    title: "Analista Programador",
    institution: "Duoc UC Sede Antonio Varas",
    period: "2021-2023",
  },
  {
    title: "Enseñanza Media",
    institution: "Liceo Politécnico Andes Fundación Duoc UC",
    period: "",
  },
  {
    title: "Enseñanza Básica",
    institution: "Escuela Calicanto E291",
    period: "",
  },
];

const experienceItems: ExperienceItem[] = [
  {
    title: "Analista Programador",
    company: "Ing Protec Ind",
    period: "Septiembre 2024 – Actualidad",
  },
  {
    title: "Operario de Losa",
    company: "Sky Airline",
    period: "Enero 2019 – Septiembre 2020",
  },
  {
    title: "Técnico en Laboratorio",
    company: "Anovo Andes S.A.",
    period: "Octubre 2015 - Febrero 2018",
  },
  {
    title: "Ayudante en Construcción",
    company: "George Instalaciones S.A.",
    period: "Abril 2015 - Julio 2015",
  },
  {
    title: "Técnico mantenimiento de nebulizadores",
    company: "Sometec",
    period: "Junio 2013 - Noviembre 2013",
  },
  {
    title: "Práctica Media técnica",
    company: "Aitec. S.A",
    period: "Enero 2013 - Abril 2013",
  },
];
