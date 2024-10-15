"use client";

import React from "react";
import Starfield from "./Starfield";
import { useTheme } from "./ThemeContext";

const StarfieldBackground: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Starfield starCount={5000} speedFactor={0.15} theme={theme} />
    </div>
  );
};

export default StarfieldBackground;
