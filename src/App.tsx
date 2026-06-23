import React, { useState, useEffect } from 'react';
import { MusicController } from './components/MusicController';
import { MouseGlow } from './components/MouseGlow';
import { useGameStore } from './store/useGameStore';
import { AnimatePresence, motion } from 'framer-motion';

// Chapters
import { Chapter1_MagicGate } from './components/Chapter1_MagicGate';
import { Chapter2_FirstPage } from './components/Chapter2_FirstPage';
import { Chapter3_MemoryGalaxy } from './components/Chapter3_MemoryGalaxy';
import { Chapter4_LoveQuests } from './components/Chapter4_LoveQuests';
import { Chapter5_DateAdventure } from './components/Chapter5_DateAdventure';
import { Chapter6_MoonInvitation } from './components/Chapter6_MoonInvitation';
import { Chapter7_100Reasons } from './components/Chapter7_100Reasons';
import { Chapter8_OpenWhen } from './components/Chapter8_OpenWhen';
import { Chapter9_OurFuture } from './components/Chapter9_OurFuture';
import { Chapter10_LoveDashboard } from './components/Chapter10_LoveDashboard';
import { Chapter12_FinalLetter } from './components/Chapter12_FinalLetter';
import { Chapter13_GrandFinale } from './components/Chapter13_GrandFinale';
import { shortMessages } from './resources/content';

function App() {
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const { unlockedMessages, incrementStarsFound } = useGameStore();

  // Handle Easter Egg Toast Messages
  useEffect(() => {
    if (unlockedMessages.length > 0) {
      const latestMsg = unlockedMessages[unlockedMessages.length - 1];
      setToastMsg(latestMsg);
      const timer = setTimeout(() => setToastMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [unlockedMessages]);

  // Global Easter Eggs: Secret Stars clicked anywhere randomly, or keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'l' && e.ctrlKey) {
        // Ctrl+L easter egg
        useGameStore.getState().unlockMessage(shortMessages[4]); // Fun fact: You're my favorite notification
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!gateUnlocked) {
    return (
      <div className="bg-[#0f172a] min-h-screen text-white font-sans overflow-hidden">
        <MouseGlow />
        <MusicController />
        <Chapter1_MagicGate onUnlock={() => setGateUnlocked(true)} />
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-primary/30 selection:text-white">
      {/* Background Ambience */}
      <div className="aurora-bg" />
      <MouseGlow />
      <MusicController />

      {/* Secret click layer for finding hidden stars randomly */}
      <div 
        className="fixed inset-0 z-[-1]" 
        onClick={(e) => {
          if (Math.random() > 0.95) {
            incrementStarsFound();
            useGameStore.getState().unlockMessage(shortMessages[0]); // You found a secret
          }
        }}
      />

      {/* Toast Notification for Achievements & Easter Eggs */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[100] glass-card px-6 py-3 border-primary/50 text-white font-display text-sm md:text-base whitespace-nowrap shadow-[0_0_30px_rgba(255,110,199,0.3)]"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full relative z-10 flex flex-col gap-24 md:gap-32">
        <section id="chapter2"><Chapter2_FirstPage /></section>
        <section id="chapter3"><Chapter3_MemoryGalaxy /></section>
        
        {/* Quests are placed strategically to track progress so far */}
        <div className="fixed top-24 right-0 z-40 scale-75 md:scale-100 origin-top-right pointer-events-none">
          <Chapter4_LoveQuests />
        </div>

        <section id="chapter5"><Chapter5_DateAdventure /></section>
        <section id="chapter6"><Chapter6_MoonInvitation /></section>
        <section id="chapter7"><Chapter7_100Reasons /></section>
        <section id="chapter8"><Chapter8_OpenWhen /></section>
        <section id="chapter9"><Chapter9_OurFuture /></section>
        <section id="chapter10"><Chapter10_LoveDashboard /></section>
        <section id="chapter12"><Chapter12_FinalLetter /></section>
        <section id="chapter13"><Chapter13_GrandFinale /></section>
      </main>
    </div>
  );
}

export default App;
