import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Heart } from 'lucide-react';
import { cn } from '../utils/cn';

const initialDreams = [
  { text: "Watch a sunset", done: true },
  { text: "Have a picnic", done: true },
  { text: "Travel together", done: false },
  { text: "Watch northern lights", done: false },
  { text: "Grow old together", done: false }
];

export const FutureDreams: React.FC = () => {
  const [dreams, setDreams] = useState(initialDreams);

  const toggleDream = (index: number) => {
    const newDreams = [...dreams];
    newDreams[index].done = !newDreams[index].done;
    setDreams(newDreams);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <Heart className="w-12 h-12 fill-primary/30 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Things I Want To Do With You</h2>
          <p className="text-white/60">Our future is my favorite daydream.</p>
        </div>

        <div className="flex flex-col gap-4">
          {dreams.map((dream, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => toggleDream(idx)}
              className={cn(
                "group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                dream.done 
                  ? "bg-primary/10 border-primary/30" 
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors",
                dream.done ? "bg-primary border-primary" : "border-white/30 group-hover:border-white/50"
              )}>
                {dream.done && <Check className="w-5 h-5 text-white" />}
              </div>
              <span className={cn(
                "text-lg transition-all",
                dream.done ? "text-white/70 line-through" : "text-white/90"
              )}>
                {dream.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
