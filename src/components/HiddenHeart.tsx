import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';

interface Props {
  className?: string;
}

export const HiddenHeart: React.FC<Props> = ({ className = "" }) => {
  const [found, setFound] = useState(false);
  const { incrementHearts, heartsCollected, unlockMessage } = useGameStore();

  const handleFind = () => {
    if (found) return;
    setFound(true);
    incrementHearts();
    if (heartsCollected === 4) {
      unlockMessage("Achievement Unlocked: Heart Collector ❤️");
    } else {
      unlockMessage(`You found a hidden heart! (${heartsCollected + 1}/5)`);
    }
  };

  return (
    <AnimatePresence>
      {!found && (
        <motion.button
          exit={{ opacity: 0, scale: 3, y: -50 }}
          transition={{ duration: 1 }}
          onClick={handleFind}
          className={`absolute z-50 cursor-pointer w-6 h-6 flex items-center justify-center group ${className}`}
        >
          <Heart className="w-3 h-3 md:w-4 md:h-4 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
