import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const dateIdeas = [
  "Moonlight walk",
  "Movie night",
  "Coffee date",
  "Picnic",
  "Road trip",
  "Game night",
  "Bookstore date",
  "Sunrise watching",
  "Beach walk",
  "Photography adventure"
];

export const Chapter5_DateAdventure: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showInvite, setShowInvite] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    setSelectedDate(null);
    setShowInvite(false);
    
    setTimeout(() => {
      const randomDate = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
      setSelectedDate(randomDate);
      setIsSpinning(false);
      setTimeout(() => setShowInvite(true), 1000);
    }, 3000);
  };

  const handleAccept = () => {
    if (selectedDate) {
      const existing = JSON.parse(localStorage.getItem('moonlit_bucket_list') || '[]');
      if (!existing.includes(selectedDate)) {
        localStorage.setItem('moonlit_bucket_list', JSON.stringify([...existing, selectedDate]));
      }
      setShowInvite(false);
      setSelectedDate("Added to our bucket list! ❤️");
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center z-10 w-full max-w-2xl"
      >
        <p className="text-primary/80 uppercase tracking-[0.3em] text-xs font-bold mb-4">Chapter 5</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12 drop-shadow-lg">
          Date Adventure Generator
        </h2>

        <div className="glass-card p-8 md:p-16 relative overflow-visible">
          <div className="relative w-full h-48 md:h-64 flex items-center justify-center mb-8 border border-white/10 rounded-2xl bg-black/20 shadow-inner overflow-hidden perspective-1000">
            {/* Spinning Wheel Effect */}
            <AnimatePresence mode="wait">
              {isSpinning ? (
                <motion.div
                  key="spinning"
                  animate={{ rotateX: [0, 1080] }}
                  transition={{ duration: 3, ease: "backOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="w-full h-full flex items-center justify-center text-primary font-display text-4xl font-bold blur-[2px]"
                >
                  SPINNING...
                </motion.div>
              ) : selectedDate ? (
                <motion.div
                  key="result"
                  initial={{ scale: 0, opacity: 0, rotateZ: -10 }}
                  animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-3xl md:text-5xl font-display text-white font-bold text-gradient text-center px-4"
                >
                  {selectedDate}
                </motion.div>
              ) : (
                <motion.div key="idle" className="text-white/40 text-lg md:text-xl font-display">
                  Tap to spin the wheel of adventures
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {!showInvite && !isSpinning && selectedDate !== "Added to our bucket list! ❤️" && (
              <motion.button
                key="spin-btn"
                exit={{ opacity: 0, y: 20 }}
                onClick={handleSpin}
                className="glass-button w-full text-xl py-6"
              >
                Spin the Wheel
              </motion.button>
            )}

            {showInvite && (
              <motion.div
                key="invite"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <p className="text-2xl text-white font-display">Would you like to do this with me?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={handleAccept} className="glass-button flex-1 bg-primary/20 border-primary/50 text-white shadow-[0_0_20px_rgba(255,110,199,0.3)]">
                    YES ❤️
                  </button>
                  <button onClick={handleAccept} className="glass-button flex-1 bg-white/20">
                    ABSOLUTELY ❤️
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
