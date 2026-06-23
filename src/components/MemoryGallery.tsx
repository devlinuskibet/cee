import React from 'react';
import { motion } from 'framer-motion';
import { images } from '../resources/images';

const captions = [
  "The day you stole my heart ❤️",
  "A perfect moment frozen in time ✨",
  "Your smile lights up my world ☀️",
  "Just the two of us 🦋",
  "Making memories to last a lifetime 🌟",
  "Every second with you is precious 💖",
  "Our little adventures 🎈"
];

export const MemoryGallery: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">Our Memories</h2>
        <p className="text-white/70">A collection of our beautiful moments</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 10 - 5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0,
              y: -10,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)" 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="glass-card p-4 pb-16 bg-white/10 backdrop-blur-md rounded-sm cursor-pointer group origin-center perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 rounded border border-white/10">
              <img 
                src={src} 
                alt="Memory" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 text-center px-4">
              <p className="font-display text-white/90 font-medium text-lg italic">
                {captions[idx % captions.length]}
              </p>
              <p className="text-white/50 text-xs mt-1 uppercase tracking-wider font-sans">
                2026
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
