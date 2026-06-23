import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const InteractiveEnding: React.FC = () => {
  const [answered, setAnswered] = useState(false);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 relative">
      <AnimatePresence>
        {!answered ? (
          <motion.div
            key="question"
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="text-center max-w-2xl mx-auto glass-card p-8 md:p-16"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8"
            >
              Out of all the moments we've shared...
              <br /><br />
              my favorite part is knowing there are still thousands more ahead.
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-bold text-gradient mb-12"
            >
              Will you continue this adventure with me?
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <button 
                onClick={() => setAnswered(true)}
                className="glass-button text-lg px-12 py-4"
              >
                Always ❤️
              </button>
              <button 
                onClick={() => setAnswered(true)}
                className="glass-button text-lg px-12 py-4 bg-primary/20 border-primary/50"
              >
                Forever ❤️
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center z-20"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white text-gradient mb-6">
              I Love You, Cee ❤️
            </h2>
            <p className="text-xl text-white/80 italic">Here's to forever.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extravagant Animation triggered on answer */}
      <AnimatePresence>
        {answered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
          >
            {/* Massive amount of floating hearts */}
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: '100vh', 
                  x: Math.random() * window.innerWidth,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: 1
                }}
                animate={{ 
                  y: '-20vh',
                  x: `calc(${Math.random() * window.innerWidth}px + ${Math.random() * 200 - 100}px)`,
                  opacity: 0
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2,
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
                className="absolute text-4xl text-primary"
              >
                ❤️
              </motion.div>
            ))}
            {/* White overlay flash */}
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
