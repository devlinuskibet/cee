import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhenLetters } from '../resources/content';
import { Mail, X, Heart } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { HiddenHeart } from './HiddenHeart';

type LetterKey = keyof typeof openWhenLetters;

export const Chapter8_OpenWhen: React.FC = () => {
  const [openedLetter, setOpenedLetter] = useState<LetterKey | null>(null);
  const { secretLetterFound, unlockMessage, findSecretLetter } = useGameStore();

  return (
    <div className="w-full min-h-screen py-24 px-4 flex flex-col items-center justify-center relative">
      <HiddenHeart className="top-32 right-10 md:top-40 md:right-32" />
      <div className="text-center mb-16 z-10 max-w-3xl">
        <p className="text-primary/80 uppercase tracking-[0.3em] text-xs font-bold mb-2">Chapter 8</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">Open When...</h2>
        <p className="text-white/60">Sealed glass envelopes for when you need them most.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-12 max-w-5xl mx-auto relative">
        {Object.keys(openWhenLetters).map((key, index) => {
          if (key === 'secret') return null; // Hide the secret letter from the main list
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenedLetter(key as LetterKey)}
                className="glass-card p-6 w-36 h-24 md:w-48 md:h-32 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all group border-primary/20 hover:border-primary"
              >
                <Mail className="w-8 h-8 text-white/50 group-hover:text-primary transition-colors" />
                <span className="text-sm font-display text-white/80 group-hover:text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </button>
            </motion.div>
          );
        })}

        {/* Secret Letter Quest Item */}
        {!secretLetterFound && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            whileHover={{ opacity: 0.8, scale: 1.1 }}
            className="absolute -bottom-16 -right-4 md:-bottom-24 md:-right-12 cursor-pointer z-50 p-4"
            onClick={() => {
              findSecretLetter();
              unlockMessage("Achievement Unlocked: The Missing Letter ✉️");
              setOpenedLetter("secret" as LetterKey);
            }}
          >
            <Mail className="w-6 h-6 text-primary drop-shadow-[0_0_10px_rgba(255,110,199,0.8)]" />
          </motion.div>
        )}
      </div>

      {/* Opened Letter Modal */}
      <AnimatePresence>
        {openedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto"
            onClick={() => setOpenedLetter(null)}
          >
            <motion.div
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#fff9f0] p-8 md:p-12 rounded-sm shadow-2xl my-8 mx-auto origin-top"
            >
              <button 
                onClick={() => setOpenedLetter(null)}
                className="absolute top-4 right-4 text-black/40 hover:text-black/80 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="font-display text-gray-800 whitespace-pre-wrap leading-relaxed text-lg md:text-xl">
                {openWhenLetters[openedLetter]}
              </div>

              {/* Decorative stamp/seal */}
              <div className="absolute bottom-4 right-8 opacity-20 pointer-events-none">
                <Heart className="w-16 h-16 fill-red-500 text-red-500 transform -rotate-12" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
