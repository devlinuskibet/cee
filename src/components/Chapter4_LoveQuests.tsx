import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Heart, Moon, Star, Mail, X, Target } from 'lucide-react';
import { cn } from '../utils/cn';

export const Chapter4_LoveQuests: React.FC = () => {
  const { heartsCollected, moonClicks, starsFound, secretLetterFound, questsCompleted } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);

  const quests = [
    {
      id: 1,
      title: "Heart Collector",
      desc: "Find 5 hidden hearts",
      icon: <Heart className="w-5 h-5" />,
      progress: Math.min(heartsCollected, 5),
      total: 5,
      reward: "Unlocks a secret note"
    },
    {
      id: 2,
      title: "Moon Gazer",
      desc: "Click the moon 10 times",
      icon: <Moon className="w-5 h-5" />,
      progress: Math.min(moonClicks, 10),
      total: 10,
      reward: "Special Star Shower Animation"
    },
    {
      id: 3,
      title: "Star Catcher",
      desc: "Collect 5 background stars",
      icon: <Star className="w-5 h-5" />,
      progress: Math.min(starsFound, 5),
      total: 5,
      reward: "Hidden photo unlocked"
    },
    {
      id: 4,
      title: "The Missing Letter",
      desc: "Find the secret envelope",
      icon: <Mail className="w-5 h-5" />,
      progress: secretLetterFound ? 1 : 0,
      total: 1,
      reward: "A very special message"
    }
  ];

  return (
    <div className="w-full py-24 px-4 relative z-10 pointer-events-none">
      <div className="max-w-xs md:max-w-sm mx-auto md:ml-auto md:mr-8 pointer-events-auto">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div 
              key="card"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-card p-6 border-primary/30 relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                aria-label="Close Quests"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between mb-6 pr-8">
                <h3 className="font-display text-xl font-bold text-white">Love Quests</h3>
                <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest">
                  {questsCompleted} / 4
                </div>
              </div>

              <div className="space-y-6">
                {quests.map(quest => {
                  const isCompleted = quest.progress >= quest.total;
                  return (
                    <div key={quest.id} className="relative">
                      <div className={cn(
                        "flex items-center gap-4 transition-all",
                        isCompleted ? "opacity-50" : "opacity-100"
                      )}>
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border shrink-0",
                          isCompleted ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(255,110,199,0.5)]" : "bg-white/5 border-white/20 text-white/50"
                        )}>
                          {quest.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={cn("text-sm font-bold truncate", isCompleted ? "text-primary line-through" : "text-white")}>
                            {quest.title}
                          </h4>
                          <p className="text-xs text-white/50 truncate">{quest.desc}</p>
                          
                          <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-primary to-secondary"
                              initial={{ width: 0 }}
                              animate={{ width: `${(quest.progress / quest.total) * 100}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>
                      </div>
                      {isCompleted && (
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute -right-2 -top-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg"
                        >
                          DONE
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex justify-end"
            >
              <button
                onClick={() => setIsOpen(true)}
                className="glass-button !p-0 w-14 h-14 flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(255,110,199,0.4)] relative bg-black/40 backdrop-blur-xl border border-primary/40 text-white hover:bg-black/60 hover:scale-110 transition-all"
                aria-label="Open Quests"
              >
                <Target className="w-6 h-6 text-primary" />
                {/* Badge for progress */}
                {questsCompleted > 0 && questsCompleted < 4 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                    {questsCompleted}
                  </span>
                )}
                {questsCompleted === 4 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                    ✓
                  </span>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
