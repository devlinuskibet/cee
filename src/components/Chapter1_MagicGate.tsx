import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import { cn } from '../utils/cn';
import { HiddenHeart } from './HiddenHeart';
import { useGameStore } from '../store/useGameStore';

interface Props {
  onUnlock: () => void;
}

export const Chapter1_MagicGate: React.FC<Props> = ({ onUnlock }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const { unlockMessage } = useGameStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === 'cee') {
      setUnlocked(true);
      setError(false);
      unlockMessage("Welcome my love ❤️");
      setTimeout(() => onUnlock(), 3000);
    } else {
      setError(true);
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]">
      <HiddenHeart className="bottom-10 left-10 md:bottom-20 md:left-20" />
      
      {/* Starry background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {!unlocked ? (
          <motion.div
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="glass-card p-8 md:p-12 text-center border-t border-white/20">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 mx-auto mb-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <Lock className="w-8 h-8 text-white/70" />
              </motion.div>

              <h1 className="text-xl md:text-2xl font-display text-white/90 mb-2">Someone special has arrived...</h1>
              <p className="text-sm text-primary/80 mb-8 italic">Before entering, answer one question.</p>

              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">Who owns my heart?</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="relative">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setError(false);
                    }}
                    placeholder="Her name..."
                    className={cn(
                      "w-full bg-white/5 border-b-2 border-white/20 px-4 py-3 text-center text-xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors bg-transparent",
                      error && "border-red-400/50 text-red-200"
                    )}
                  />
                  {error && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 left-0 right-0 text-red-400/80 text-xs uppercase tracking-widest"
                    >
                      Nice try 😘
                    </motion.span>
                  )}
                </div>

                <button type="submit" className="glass-button mt-4">
                  Open Portal
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-center"
          >
            <motion.div
              animate={{ scale: [1, 20], opacity: [1, 0] }}
              transition={{ duration: 2.5, delay: 0.5, ease: "easeIn" }}
              className="absolute inset-0 bg-white rounded-full mix-blend-screen pointer-events-none"
            />
            <Unlock className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white text-gradient">
              Welcome my love ❤️
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
