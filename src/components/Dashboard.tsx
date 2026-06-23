import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const START_DATE = new Date('2019-04-08T00:00:00');

const dailyMessages = [
  "Today is special because you exist in my life ❤️",
  "Every day with you is my new favorite day ✨",
  "I love you more today than I did yesterday 💖",
  "Just a daily reminder that you are my everything 🌟",
  "You make ordinary days feel extraordinary 🦋"
];

const getDailyMessage = () => {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return dailyMessages[dayIndex % dailyMessages.length];
};

export const Dashboard: React.FC = () => {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - START_DATE.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-12"
    >
      <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-display font-semibold text-white/90 mb-2">Our Journey</h2>
          <p className="text-sm text-primary/80 italic">{getDailyMessage()}</p>
        </div>

        <div className="flex gap-4 text-center">
          {[
            { label: 'Days', value: timeTogether.days },
            { label: 'Hours', value: timeTogether.hours },
            { label: 'Mins', value: timeTogether.minutes },
            { label: 'Secs', value: timeTogether.seconds }
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-white tracking-wider">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
