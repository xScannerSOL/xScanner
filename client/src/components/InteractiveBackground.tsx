import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Generate particles
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -20,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert mouse position to percentage
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Dynamic base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary)) 0%, transparent 70%)`,
        }}
        transition={{ type: "spring", bounce: 0, duration: 2 }}
        style={{ opacity: 0.15 }}
      />

      {/* Floating particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: ["-20%", "120%"],
            x: [`${particle.x - 10}%`, `${particle.x + 10}%`],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
            times: [0, 0.5, 1],
            x: {
              duration: particle.duration * 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}

      {/* Additional layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-transparent to-background/90" />

      {/* Animated dot pattern */}
      <div className="absolute inset-0 bg-grid-primary text-primary/40" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
    </>
  );
}