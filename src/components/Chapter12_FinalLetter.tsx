import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { finalLetter } from '../resources/content';

export const Chapter12_FinalLetter: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-200px" });
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    if (isInView) {
      let i = 0;
      const timer = setInterval(() => {
        setDisplayedText(finalLetter.substring(0, i));
        i++;
        if (i > finalLetter.length) {
          clearInterval(timer);
        }
      }, 30); // Typewriter speed
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <div className="w-full min-h-[150vh] flex flex-col items-center justify-center py-24 px-4 relative overflow-hidden" ref={containerRef}>
      
      {/* Soft glowing background and moving stars */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-[800px] bg-primary/5 blur-[120px] rounded-full" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/40 rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="text-center mb-16 z-10">
        <p className="text-primary/80 uppercase tracking-[0.3em] text-xs font-bold mb-2">Chapter 12</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">The Final Letter</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5 }}
        className="w-full max-w-2xl frosted-panel p-8 md:p-16 rounded-sm relative"
      >
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50" />
        
        <p className="font-display text-white/90 text-lg md:text-xl leading-loose whitespace-pre-wrap">
          {displayedText}
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-6 bg-primary ml-1 align-middle"
          />
        </p>
      </motion.div>
    </div>
  );
};
