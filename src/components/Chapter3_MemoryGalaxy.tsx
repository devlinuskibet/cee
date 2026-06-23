import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { images } from '../resources/images';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

const memoryTexts = [
  "A perfect moment frozen in time ✨",
  "Your smile lights up my world ☀️",
  "Just the two of us 🦋",
  "Making memories to last a lifetime 🌟",
  "Every second with you is precious 💖",
  "Our little adventures 🎈",
  "The day you stole my heart ❤️"
];

export const Chapter3_MemoryGalaxy: React.FC = () => {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  return (
    <div className="min-h-[120vh] relative py-24 px-4 flex flex-col items-center">
      <div className="text-center mb-24 z-10">
        <p className="text-primary/80 uppercase tracking-[0.3em] text-xs font-bold mb-2">Chapter 3</p>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-gradient">Memory Galaxy</h2>
        <p className="text-white/60 mt-4">Click a star to relive a memory</p>
      </div>

      <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">
        {images.map((src, idx) => {
          // Calculate orbiting positions
          const angle = (idx / images.length) * Math.PI * 2;
          const radiusX = window.innerWidth < 768 ? 120 : 300;
          const radiusY = window.innerWidth < 768 ? 200 : 150;
          const left = `calc(50% + ${Math.cos(angle) * radiusX}px)`;
          const top = `calc(50% + ${Math.sin(angle) * radiusY}px)`;

          return (
            <motion.div
              key={idx}
              className="absolute w-24 h-24 md:w-32 md:h-32 cursor-pointer z-10"
              style={{ left, top, x: '-50%', y: '-50%' }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + (idx % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.2
              }}
              onClick={() => setActiveImage(idx)}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,110,199,0.5)] transition-all duration-300">
                <img src={src} alt="Orbiting memory" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg glass-card p-4 pb-20 bg-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full aspect-[4/5] rounded overflow-hidden">
                <img src={images[activeImage]} alt="Memory full" className="w-full h-full object-cover" />
              </div>
              
              <div className="absolute bottom-6 left-0 right-0 text-center px-6">
                <p className="font-display text-white text-xl md:text-2xl italic drop-shadow-lg">
                  "{memoryTexts[activeImage % memoryTexts.length]}"
                </p>
              </div>

              {/* Magical floating particles around open image */}
              <div className="absolute -inset-10 pointer-events-none -z-10 overflow-hidden">
                 {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-primary/50 shadow-[0_0_10px_rgba(255,110,199,0.8)]"
                      initial={{ 
                        x: "50%", y: "50%", opacity: 1 
                      }}
                      animate={{ 
                        x: `${Math.random() * 100}%`, 
                        y: `${Math.random() * 100}%`,
                        opacity: [1, 0] 
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                    />
                 ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
