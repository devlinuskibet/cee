import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '../utils/cn';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAnswer = answer.trim().toLowerCase();
    
    if (cleanAnswer === 'cee') {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        onLogin();
      }, 2000);
    } else {
      setError(true);
      setAnswer('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <AnimatePresence>
        {!success ? (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 md:p-12 max-w-md w-full text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mx-auto w-16 h-16 mb-6 text-primary flex items-center justify-center"
            >
              <Heart className="w-12 h-12 fill-primary/50" />
            </motion.div>

            <h1 className="text-2xl md:text-3xl font-display font-medium text-white mb-8">
              Who is the most beautiful girl in the world?
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setError(false);
                }}
                placeholder="Type her name..."
                className={cn(
                  "bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-center text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all",
                  error && "border-red-400/50 bg-red-400/10"
                )}
              />

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-accent text-sm"
                  >
                    Nice try 😘
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="glass-button mt-4"
              >
                Enter World
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success-msg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-display text-white text-gradient">
              Welcome my love ❤️
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
