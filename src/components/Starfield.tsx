"use client";

import React, { useEffect, useRef } from "react";

interface Props {
  speedFactor?: number;
  starCount?: number;
  theme: "light" | "dark";
}

export default function Starfield(props: Props) {
  const { speedFactor = 0.05, starCount = 5000, theme } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext("2d");
    if (!c) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const setCanvasExtents = () => {
      canvas.width = w;
      canvas.height = h;
    };

    setCanvasExtents();

    const makeStars = (count: number) => {
      const out = [];
      for (let i = 0; i < count; i++) {
        const s = {
          x: Math.random() * 1600 - 800,
          y: Math.random() * 900 - 450,
          z: Math.random() * 1000,
        };
        out.push(s);
      }
      return out;
    };

    const stars = makeStars(starCount);

    const clear = () => {
      c.fillStyle = theme === "dark" ? "black" : "white";
      c.fillRect(0, 0, canvas.width, canvas.height);
    };

    const putPixel = (x: number, y: number, brightness: number) => {
      const rgb =
        theme === "dark"
          ? `rgba(255, 255, 255, ${brightness})`
          : `rgba(0, 0, 0, ${brightness})`;
      c.fillStyle = rgb;
      c.fillRect(x, y, 1, 1);
    };

    const moveStars = (distance: number) => {
      const count = stars.length;
      for (let i = 0; i < count; i++) {
        const s = stars[i];
        s.z -= distance;
        while (s.z <= 1) {
          s.z += 1000;
        }
      }
    };

    let prevTime: number;
    const init = (time: number) => {
      prevTime = time;
      requestAnimationFrame(tick);
    };

    const tick = (time: number) => {
      const elapsed = time - prevTime;
      prevTime = time;

      moveStars(elapsed * speedFactor);

      clear();

      const cx = w / 2;
      const cy = h / 2;

      const count = stars.length;
      for (let i = 0; i < count; i++) {
        const star = stars[i];

        const x = cx + star.x / (star.z * 0.001);
        const y = cy + star.y / (star.z * 0.001);

        if (x < 0 || x >= w || y < 0 || y >= h) {
          continue;
        }

        const d = star.z / 1000.0;
        const b = 1 - d * d;

        putPixel(x, y, b);
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(init);

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      setCanvasExtents();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, speedFactor, starCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        padding: 0,
        margin: 0,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
        opacity: 1,
        pointerEvents: "none",
      }}
    ></canvas>
  );
}
