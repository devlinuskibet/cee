import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const dateIdeas = [
  "Movie Night",
  "Coffee Date",
  "Picnic in the Park",
  "Moonlight Walk",
  "Road Trip",
  "Bookstore Date",
  "Ice Cream Adventure"
];

const adventures = [
  "Let's watch the sunrise together",
  "Let's visit a new town",
  "Let's cook together",
  "Let's get matching hoodies",
  "Let's watch stars"
];

export const DateGames: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [savedDates, setSavedDates] = useState<string[]>([]);
  const [bucketList, setBucketList] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('moonlit_saved_dates');
    if (saved) setSavedDates(JSON.parse(saved));
    const bucket = localStorage.getItem('moonlit_bucket_list');
    if (bucket) setBucketList(JSON.parse(bucket));
  }, []);

  const handleSpin = () => {
    setIsSpinning(true);
    setSelectedDate(null);
    setTimeout(() => {
      const randomDate = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
      setSelectedDate(randomDate);
      setIsSpinning(false);
    }, 2000);
  };

  const confirmDate = (answer: string) => {
    if (selectedDate && !savedDates.includes(selectedDate)) {
      const newDates = [...savedDates, `${selectedDate} (${answer})`];
      setSavedDates(newDates);
      localStorage.setItem('moonlit_saved_dates', JSON.stringify(newDates));
      setSelectedDate(null);
    }
  };

  const addAdventure = (adv: string) => {
    if (!bucketList.includes(adv)) {
      const newList = [...bucketList, adv];
      setBucketList(newList);
      localStorage.setItem('moonlit_bucket_list', JSON.stringify(newList));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">Little Love Games</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Date Generator */}
        <div className="glass-card p-8 flex flex-col items-center text-center">
          <h3 className="text-2xl font-display text-white mb-6">Meaningful Date Generator</h3>
          
          <div className="relative w-full h-40 flex items-center justify-center mb-8 border border-white/20 rounded-xl bg-white/5 overflow-hidden">
            <AnimatePresence mode="wait">
              {isSpinning ? (
                <motion.div
                  key="spinning"
                  animate={{ y: [0, -50, 0] }}
                  transition={{ repeat: Infinity, duration: 0.2 }}
                  className="text-primary font-display text-2xl blur-[1px]"
                >
                  Spinning...
                </motion.div>
              ) : selectedDate ? (
                <motion.div
                  key="result"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring" }}
                  className="text-2xl font-display text-white font-semibold"
                >
                  {selectedDate}
                </motion.div>
              ) : (
                <motion.div key="idle" className="text-white/50">
                  Click below to spin the wheel
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!selectedDate ? (
            <button onClick={handleSpin} disabled={isSpinning} className="glass-button w-full max-w-xs">
              {isSpinning ? 'Generating...' : 'Spin for a Date'}
            </button>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              <p className="text-white/80">Would you like to do this with me?</p>
              <div className="flex gap-4 w-full justify-center">
                <button onClick={() => confirmDate('Yes ❤️')} className="glass-button flex-1 max-w-[150px]">
                  Yes ❤️
                </button>
                <button onClick={() => confirmDate('Definitely ❤️')} className="glass-button flex-1 max-w-[150px]">
                  Definitely ❤️
                </button>
              </div>
            </div>
          )}

          {savedDates.length > 0 && (
            <div className="mt-8 w-full text-left">
              <h4 className="text-white/70 mb-2 font-medium">Our Upcoming Dates:</h4>
              <ul className="text-sm text-primary/80 space-y-1">
                {savedDates.map((d, i) => (
                  <li key={i}>✨ {d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Next Adventure */}
        <div className="glass-card p-8">
          <h3 className="text-2xl font-display text-white mb-6 text-center">Choose Our Next Adventure</h3>
          <div className="flex flex-col gap-3">
            {adventures.map((adv, idx) => {
              const isAdded = bucketList.includes(adv);
              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: isAdded ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addAdventure(adv)}
                  disabled={isAdded}
                  className={`p-4 rounded-xl text-left transition-colors border ${
                    isAdded 
                      ? 'bg-primary/20 border-primary/50 text-white' 
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{adv}</span>
                    {isAdded && <span className="text-primary text-sm font-medium">Adventure Added ❤️</span>}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
