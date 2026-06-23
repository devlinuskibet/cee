import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { MemoryGallery } from './components/MemoryGallery';
import { DateGames } from './components/DateGames';
import { FutureDreams } from './components/FutureDreams';
import { InteractiveEnding } from './components/InteractiveEnding';
import { FloatingMoon } from './components/FloatingMoon';
import { MusicController } from './components/MusicController';
import { SecretStars } from './components/SecretStars';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen aurora-bg font-sans selection:bg-primary/30 selection:text-primary-light">
      <MusicController />
      
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <LoginScreen key="login" onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 w-full"
          >
            <FloatingMoon />
            <SecretStars />
            
            <main className="container mx-auto px-4 py-12 flex flex-col gap-24">
              <section id="dashboard" className="min-h-[60vh] flex items-center">
                <Dashboard />
              </section>

              <section id="memories" className="min-h-screen">
                <MemoryGallery />
              </section>

              <section id="games" className="min-h-screen flex items-center">
                <DateGames />
              </section>

              <section id="dreams" className="min-h-[80vh] flex items-center">
                <FutureDreams />
              </section>

              <section id="ending" className="min-h-screen flex items-center border-t border-white/10">
                <InteractiveEnding />
              </section>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
