import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, HeartPulse, Award } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';

const START_DATE = new Date('2019-04-08T00:00:00');

export const Chapter10_LoveDashboard: React.FC = () => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { heartsCollected, moonClicks } = useGameStore();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();
      
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Days Together", value: time.days, icon: <Calendar /> },
    { label: "Hours Loved", value: (time.days * 24 + time.hours).toLocaleString(), icon: <Clock /> },
    { label: "Hearts Found", value: heartsCollected, icon: <HeartPulse /> },
    { label: "Moon Clicks", value: moonClicks, icon: <Award /> }
  ];

  return (
    <div className="w-full min-h-[80vh] py-24 px-4 flex flex-col items-center justify-center">
      <div className="text-center mb-16 z-10">
        <p className="text-primary/80 uppercase tracking-[0.3em] text-xs font-bold mb-2">Chapter 10</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">Love Dashboard</h2>
        <p className="text-white/60">Real-time analytics of our journey.</p>
      </div>

      <div className="w-full max-w-5xl glass-card p-8 md:p-12 relative overflow-visible">
        {/* Decorative glowing orb behind dashboard */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10" />

        {/* Live Timer Giant Display */}
        <div className="grid grid-cols-4 gap-2 md:gap-8 mb-12 border-b border-white/10 pb-12">
          {[
            { label: 'Days', val: time.days },
            { label: 'Hours', val: time.hours },
            { label: 'Minutes', val: time.minutes },
            { label: 'Seconds', val: time.seconds }
          ].map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-3xl md:text-7xl font-display font-bold text-white tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                {item.val.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] md:text-sm uppercase tracking-widest text-primary mt-2 font-bold">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors"
            >
              <div className="text-primary/70 mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
