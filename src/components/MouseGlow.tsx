import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const MouseGlow: React.FC = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth out the movement slightly
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-0 w-96 h-96 -ml-48 -mt-48 rounded-full mix-blend-screen opacity-50"
      style={{
        x: springX,
        y: springY,
        background: 'radial-gradient(circle, rgba(255, 110, 199, 0.4) 0%, rgba(196, 113, 237, 0.1) 40%, transparent 70%)',
        filter: 'blur(40px)',
      }}
    />
  );
};
