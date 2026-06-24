import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reasons100 } from '../resources/content';
import { X } from 'lucide-react';
import { HiddenHeart } from './HiddenHeart';

export const Chapter7_100Reasons: React.FC = () => {
  const [activeReason, setActiveReason] = useState<{ id: number, text: string } | null>(null);

  // Take a random subset to display as floating cards so it's not overwhelming, 
  // or render them in a horizontal scroll / grid
  const displayedReasons = reasons100.slice(0, 30); // Show 30 at a time for performance

  return (
    <div className="min-h-screen py-24 px-4 relative flex flex-col items-center">
      <HiddenHeart className="top-20 left-10 md:top-32 md:left-32" />
      <div className="text-center mb-16 z-10">
        <p className="text-primary/80 uppercase tracking-[0.3em] text-xs font-bold mb-2">Chapter 7</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">100 Reasons I Love You</h2>
        <p className="text-white/60">Click any floating card to reveal a reason.</p>
      </div>

      {/* Floating Cards Field */}
      <div className="relative w-full max-w-6xl h-[60vh] md:h-[80vh] flex flex-wrap justify-center gap-4 items-center overflow-hidden border border-white/5 rounded-3xl bg-white/5 shadow-inner p-4">
        {displayedReasons.map((reason, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, zIndex: 10, borderColor: 'rgba(255,110,199,0.5)' }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              delay: (idx % 10) * 0.1 
            }}
            onClick={() => setActiveReason({ id: idx, text: reason })}
            className="w-16 h-24 md:w-20 md:h-28 glass-card border-white/20 flex flex-col items-center justify-center cursor-pointer group"
          >
            <span className="text-white/30 font-display text-2xl group-hover:text-primary transition-colors">
              ?
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeReason && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setActiveReason(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: -90 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glass-card p-12 text-center relative border-primary/40 shadow-[0_0_50px_rgba(255,110,199,0.2)]"
            >
              <button 
                onClick={() => setActiveReason(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-primary/60 font-bold tracking-widest text-sm mb-6 uppercase">
                Reason #{activeReason.id + 1}
              </h3>
              <p className="text-2xl md:text-3xl font-display text-white leading-relaxed">
                "{activeReason.text}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
