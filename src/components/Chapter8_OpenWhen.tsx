import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhenLetters } from '../resources/content';
import { Mail, X } from 'lucide-react';
import { cn } from '../utils/cn';

type LetterKey = keyof typeof openWhenLetters;

const envelopes: { id: LetterKey, title: string }[] = [
  { id: 'sad', title: "Open when you're sad" },
  { id: 'missMe', title: "Open when you miss me" },
  { id: 'stressed', title: "Open when you're stressed" },
  { id: 'motivation', title: "Open when you need motivation" },
  { id: 'smile', title: "Open when you need a smile" }
];

export const Chapter8_OpenWhen: React.FC = () => {
  const [openedLetter, setOpenedLetter] = useState<LetterKey | null>(null);

  return (
    <div className="w-full min-h-screen py-24 px-4 flex flex-col items-center justify-center">
      <div className="text-center mb-16 z-10">
        <p className="text-primary/80 uppercase tracking-[0.3em] text-xs font-bold mb-2">Chapter 8</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">Open When...</h2>
        <p className="text-white/60">Sealed glass envelopes for when you need them most.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
        {envelopes.map((env, idx) => (
          <motion.div
            key={env.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setOpenedLetter(env.id)}
            className="group cursor-pointer relative perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              whileHover={{ rotateX: 10, rotateY: -10, z: 20 }}
              className="glass-card p-8 flex flex-col items-center justify-center text-center h-48 border-white/30 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Mail className="w-10 h-10 text-primary/70 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-display font-medium text-white/90">{env.title}</h3>
            </motion.div>
          </motion.div>
        ))}
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
