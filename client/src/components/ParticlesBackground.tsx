import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
}

export function ParticlesBackground() {
  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.3,
          }}
          animate={{
            y: ["-20%", "120%"],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -20,
          }}
        />
      ))}
    </div>
  );
}