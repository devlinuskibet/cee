import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Moon } from 'lucide-react';

export const Chapter6_MoonInvitation: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0.3, 0.5], [500, 0]);
  const scale = useTransform(scrollYProgress, [0.4, 0.5], [0.5, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  const [accepted, setAccepted] = useState(false);
  const { unlockMessage, incrementMoonClicks, moonClicks } = useGameStore();

  const handleAccept = () => {
    setAccepted(true);
    unlockMessage("You said yes to the moon ❤️");
  };

  return (
    <div className="h-[150vh] relative overflow-hidden bg-gradient-to-b from-transparent to-[#0a0f1d] flex flex-col items-center">
      
      {/* Scroll Triggered Moon */}
      <motion.div 
        style={{ y: yOffset, scale }}
        className="sticky top-1/3 z-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-white/90 shadow-[0_0_100px_rgba(255,255,255,0.8)] flex items-center justify-center mt-24"
      >
        <Moon className="w-full h-full text-gray-200 opacity-20 absolute" />
        
        {/* Click Handler Overlay */}
        <div 
          className="absolute inset-0 cursor-pointer z-20"
          onClick={() => {
            incrementMoonClicks();
            if (moonClicks === 9) unlockMessage("Achievement Unlocked: Moon Gazer 🌕");
          }}
        />

        {/* Glow overlay */}
        <motion.div 
          style={{ opacity: glowOpacity }}
          className="absolute inset-0 rounded-full bg-yellow-100/50 mix-blend-overlay shadow-[0_0_200px_rgba(255,255,255,1)]"
        />

        {/* Text inside moon? Or below it. Let's put text over it */}
        <AnimatePresence>
          {!accepted ? (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-sm rounded-full border border-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-200px", once: false }}
            >
              <h3 className="text-xl md:text-3xl font-display font-bold text-white drop-shadow-lg mb-6 leading-tight">
                Would you watch the moon with me tonight?
              </h3>
              <button 
                onClick={handleAccept}
                className="px-8 py-3 rounded-full bg-white text-black font-bold tracking-widest hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.8)]"
              >
                YES
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
            >
              <span className="text-6xl animate-bounce">❤️</span>
              <p className="text-primary font-bold text-xl mt-4 drop-shadow-md">Forever and always</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Raining hearts if accepted */}
      <AnimatePresence>
        {accepted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 pointer-events-none z-[100]"
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                initial={{ y: -50, x: Math.random() * window.innerWidth, scale: Math.random() * 0.5 + 0.5, opacity: 0 }}
                animate={{ y: window.innerHeight + 50, opacity: [0, 1, 0] }}
                transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute text-2xl text-primary"
              >
                ❤️
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
