import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon } from 'lucide-react';
import { cn } from '../utils/cn';

const messages = [
  "Remember to hug your boyfriend 😘",
  "He spent hours building this for you ❤️",
  "You are the most beautiful girl in the world ✨",
  "I love you more than all the stars 🌟",
  "You make every day brighter ☀️"
];

export const FloatingMoon: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setMessageIndex((prev) => (prev + 1) % messages.length);
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 4000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={cn(
              "glass-card p-4 text-sm max-w-[200px] text-center text-white/90 font-medium pointer-events-auto",
              "border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            )}
          >
            Moon says:<br/>
            <span className="text-primary/90 block mt-1">{messages[messageIndex]}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={handleClick}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      >
        <Moon className="w-6 h-6 fill-white/80" />
      </motion.button>
    </div>
  );
};
