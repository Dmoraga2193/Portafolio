"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, GitPullRequest, ChevronRight } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  label: string;
  isLive?: boolean;
}

const stats: StatItem[] = [
  { icon: CheckCircle, value: 12, label: "Proyectos Completados" },
  { icon: Clock, value: 2, label: "Proyectos en Desarrollo" },
  {
    icon: GitPullRequest,
    value: 0,
    label: "Contribuciones en GitHub este año",
    isLive: true,
  },
];

export default function FloatingCounter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [githubContributions, setGithubContributions] = useState(0);

  useEffect(() => {
    const fetchGithubContributions = async () => {
      try {
        const response = await fetch("/api/github-contributions");
        const data = await response.json();
        setGithubContributions(data.contributions);
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
      }
    };

    fetchGithubContributions();
    // Actualizar cada hora
    const interval = setInterval(fetchGithubContributions, 3600000);

    return () => clearInterval(interval);
  }, []);

  const updatedStats = stats.map((stat) =>
    stat.isLive ? { ...stat, value: githubContributions } : stat
  );

  return (
    <>
      {/* Versión para pantallas grandes */}
      <motion.div
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <motion.div
          className="bg-background/80 backdrop-blur-md border border-border rounded-md shadow-lg overflow-hidden flex flex-col items-center py-2"
          variants={{
            collapsed: { width: "48px", height: "140px" },
            expanded: { width: "200px", height: "auto" },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            variants={{
              collapsed: { rotate: 0 },
              expanded: { rotate: 180 },
            }}
            className="mb-2"
          >
            <ChevronRight size={24} className=" text-primary" />
          </motion.div>
          <AnimatePresence>
            {isExpanded ? (
              <motion.div
                className="space-y-4 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {updatedStats.map((stat, index) => (
                  <StatItem key={index} stat={stat} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div className="flex flex-col items-center space-y-4">
                {updatedStats.map((stat, index) => (
                  <stat.icon key={index} size={20} className=" text-primary" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Versión para pantallas pequeñas */}
      <motion.div
        className="fixed bottom-4 left-4 z-50 lg:hidden"
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
      >
        <motion.div
          className="bg-background/80 backdrop-blur-md border border-border rounded-md shadow-lg overflow-hidden"
          variants={{
            collapsed: { width: "48px", height: "48px" },
            expanded: { width: "200px", height: "auto" },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.button
            className="w-full h-12 flex items-center justify-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <motion.div
              variants={{
                collapsed: { rotate: 0 },
                expanded: { rotate: 180 },
              }}
            >
              <ChevronRight size={24} className=" text-primary" />
            </motion.div>
          </motion.button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="px-4 pb-4 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {updatedStats.map((stat, index) => (
                  <StatItem key={index} stat={stat} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}

function StatItem({ stat, index }: { stat: StatItem; index: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        clearInterval(timer);
        setCount(stat.value);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="mr-3">
        <stat.icon size={18} className=" text-primary" />
      </div>
      <div>
        <motion.div
          className="text-base font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
        >
          {count}
        </motion.div>
        <div className="text-xs text-muted-foreground">{stat.label}</div>
      </div>
    </motion.div>
  );
}
