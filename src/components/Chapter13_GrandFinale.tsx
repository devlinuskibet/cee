import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiddenHeart } from './HiddenHeart';

export const Chapter13_GrandFinale: React.FC = () => {
  const [finished, setFinished] = useState(false);

  return (
    <div className="min-h-screen py-24 px-4 relative flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      <HiddenHeart className="top-10 left-10 md:top-20 md:left-20" />
      
      {/* Background massive glowing moon */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, y: 200 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute bottom-[-20%] w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] bg-white/5 rounded-full blur-[100px] pointer-events-none z-0"
      />

      <div className="relative z-10 w-full max-w-3xl text-center">
        <p className="text-primary/80 uppercase tracking-[0.3em] text-xs font-bold mb-8">Chapter 13</p>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key="question"
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{ duration: 1 }}
              className="space-y-16"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
                className="space-y-8"
              >
                <p className="text-2xl md:text-4xl font-display text-white/90">
                  Out of all the moments we've shared...
                </p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 2 }}
                  className="text-2xl md:text-4xl font-display text-white/90"
                >
                  My favorite part is knowing there are still thousands more waiting for us.
                </motion.p>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 4 }}
                className="text-4xl md:text-6xl font-display font-bold text-gradient py-8"
              >
                Will you continue this adventure with me?
              </motion.h2>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 5 }}
                className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto"
              >
                <button 
                  onClick={() => setFinished(true)}
                  className="glass-button w-full text-xl py-6"
                >
                  Always ❤️
                </button>
                <button 
                  onClick={() => setFinished(true)}
                  className="glass-button w-full text-xl py-6 bg-primary/20 border-primary/50"
                >
                  Forever ❤️
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="py-32"
            >
              <h2 className="text-6xl md:text-8xl font-display font-bold text-white text-gradient mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                I Love You, Cee
              </h2>
              <p className="text-2xl text-white/80 font-display italic">
                Thank you for being my greatest adventure.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Massive Celebration Animation */}
      <AnimatePresence>
        {finished && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 pointer-events-none z-[200] overflow-hidden"
          >
            {/* Supernova flash */}
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-white"
            />
            
            {/* Confetti & Hearts Explosion */}
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: '120vh', 
                  x: '50vw',
                  scale: Math.random() * 1 + 0.5,
                  opacity: 1
                }}
                animate={{ 
                  y: '-20vh',
                  x: `${Math.random() * 100}vw`,
                  rotate: Math.random() * 720
                }}
                transition={{ 
                  duration: Math.random() * 4 + 3,
                  ease: "easeOut"
                }}
                className="absolute text-4xl"
                style={{ filter: `hue-rotate(${Math.random() * 60}deg)` }}
              >
                {i % 3 === 0 ? '✨' : '❤️'}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
