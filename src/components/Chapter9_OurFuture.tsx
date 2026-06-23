import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Navigation } from 'lucide-react';
import { cn } from '../utils/cn';

const futureDreams = [
  "Travel the world together",
  "Watch the sunrise from a mountain",
  "Build our dream home",
  "Adopt a cute puppy",
  "Grow old and still hold hands"
];

export const Chapter9_OurFuture: React.FC = () => {
  const [completed, setCompleted] = useState<number[]>([]);

  const toggleDream = (index: number) => {
    if (completed.includes(index)) {
      setCompleted(completed.filter(i => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 flex flex-col items-center justify-center">
      <div className="text-center mb-16 z-10 w-full max-w-3xl">
        <p className="text-primary/80 uppercase tracking-[0.3em] text-xs font-bold mb-2">Chapter 9</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-6">Our Future</h2>
        <p className="text-white/60 text-lg">An interactive roadmap of all the things I want to experience with you.</p>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Roadmap Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full" />
        <motion.div 
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary -translate-x-1/2 rounded-full origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <div className="space-y-12">
          {futureDreams.map((dream, idx) => {
            const isCompleted = completed.includes(idx);
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={cn(
                  "relative flex items-center gap-8 md:justify-between w-full group cursor-pointer",
                  !isEven && "md:flex-row-reverse"
                )}
                onClick={() => toggleDream(idx)}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div 
                    animate={isCompleted ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "w-6 h-6 rounded-full border-4 flex items-center justify-center transition-colors duration-500",
                      isCompleted ? "bg-primary border-white shadow-[0_0_20px_rgba(255,110,199,0.8)]" : "bg-[#0f172a] border-white/30 group-hover:border-primary/50"
                    )}
                  >
                    {isCompleted && <Heart className="w-3 h-3 text-white fill-white" />}
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className={cn(
                  "ml-20 md:ml-0 md:w-[45%] glass-card p-6 border transition-all duration-500",
                  isCompleted ? "bg-primary/20 border-primary/50 shadow-[0_0_30px_rgba(255,110,199,0.3)]" : "border-white/10 group-hover:bg-white/10"
                )}>
                  <h4 className={cn(
                    "text-xl font-display transition-colors duration-500",
                    isCompleted ? "text-white" : "text-white/80"
                  )}>
                    {dream}
                  </h4>
                  {isCompleted && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-primary text-sm font-bold mt-2 flex items-center gap-2"
                    >
                      <Navigation className="w-4 h-4" /> Ready for the adventure
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
