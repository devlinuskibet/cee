import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';


const secretMessages = [
  "I still smile when I remember our first conversation.",
  "You're the first thing I think about every morning.",
  "Your laugh is my favorite sound in the world.",
  "I love the way you look at me.",
  "You make me want to be a better person.",
  "Every moment with you is a treasure.",
  "I'm so lucky to have you.",
  "I love your sense of humor.",
  "You are my safe space.",
  "I can't imagine my life without you.",
  "Your smile melts my heart every single time.",
  "I love how passionate you are.",
  "You are my dream come true.",
  "I cherish every memory we've made.",
  "You're my favorite notification.",
  "I love holding your hand.",
  "You always know how to make me smile.",
  "I'm so proud of you.",
  "You are my best friend.",
  "I love you more than words can say."
];

export const SecretStars: React.FC = () => {
  const [stars, setStars] = useState<{ id: number, x: number, y: number, msg: string }[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  useEffect(() => {
    // Generate 20 random positions
    const generatedStars = secretMessages.map((msg, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // 5% to 95%
      y: Math.random() * 90 + 5,
      msg
    }));
    setStars(generatedStars);
  }, []);

  const handleStarClick = (msg: string) => {
    setActiveMessage(msg);
    setTimeout(() => setActiveMessage(null), 5000);
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <motion.button
            key={star.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ repeat: Infinity, duration: Math.random() * 3 + 2, delay: Math.random() * 2 }}
            className="absolute p-2 pointer-events-auto hover:scale-125 transition-transform"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            onClick={() => handleStarClick(star.msg)}
          >
            <Star className="w-3 h-3 md:w-4 md:h-4 text-white/50 fill-white/20 hover:text-yellow-300 hover:fill-yellow-300 transition-colors" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="glass-card px-8 py-4 text-center min-w-[300px] border-yellow-300/30 shadow-[0_0_30px_rgba(253,224,71,0.2)]">
              <p className="text-yellow-300 text-sm font-semibold mb-1 uppercase tracking-widest">
                ✨ You found a secret message
              </p>
              <p className="text-white text-lg font-display">
                {activeMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
