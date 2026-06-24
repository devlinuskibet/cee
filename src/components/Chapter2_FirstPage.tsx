import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { images } from '../resources/images';
import { HiddenHeart } from './HiddenHeart';

export const Chapter2_FirstPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <motion.div 
      style={{ scale, opacity }}
      className="min-h-screen flex items-center justify-center p-4 py-24 relative"
    >
      <HiddenHeart className="top-10 left-10 md:top-32 md:left-32" />
      <div className="w-full max-w-4xl glass-card p-6 md:p-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-6">
          <p className="text-primary/80 uppercase tracking-[0.3em] text-xs font-bold">Chapter 2</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            Our First Page
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed text-lg">
            <p>Every great story has a beginning. Ours started with a simple hello, but it quickly became my favorite plot twist.</p>
            <p>I still remember the first time you made me laugh. The first time we stayed up way too late talking about nothing and everything.</p>
            <p>You weren't just a new person in my life; you were a new feeling. A feeling of coming home.</p>
          </div>
        </div>
        
        <div className="flex-1 relative w-full aspect-[4/5] max-w-sm mx-auto perspective-1000">
          <motion.div 
            initial={{ rotateY: -10, rotateX: 5 }}
            whileHover={{ rotateY: 0, rotateX: 0, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full h-full relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* A Polaroid style photo */}
            <div className="absolute inset-0 bg-white p-3 pb-16 shadow-2xl rounded-sm transform rotate-3">
              <img src={images[0]} alt="Our first memory" className="w-full h-full object-cover filter contrast-110 sepia-[0.2]" />
              <p className="absolute bottom-4 left-0 right-0 text-center font-display text-gray-800 text-lg">The day everything changed ❤️</p>
            </div>
            {/* Background decorative photo */}
            <div className="absolute inset-0 bg-white/80 p-3 pb-16 shadow-xl rounded-sm transform -rotate-6 -z-10 blur-[1px]">
              <img src={images[1]} alt="Memory background" className="w-full h-full object-cover grayscale opacity-50" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
