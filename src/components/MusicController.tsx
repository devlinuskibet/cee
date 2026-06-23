import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { cn } from '../utils/cn';

type Track = 'Piano' | 'Night Ambience' | 'Romantic Instrumental' | 'Silent';

export const MusicController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track>('Silent');

  const tracks: Track[] = ['Piano', 'Night Ambience', 'Romantic Instrumental', 'Silent'];

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        {currentTrack === 'Silent' ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="glass-card p-3 flex flex-col gap-2 min-w-[200px]">
          <div className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
            <Music className="w-3 h-3" /> Audio Experience
          </div>
          {tracks.map(track => (
            <button
              key={track}
              onClick={() => setCurrentTrack(track)}
              className={cn(
                "text-left px-3 py-2 rounded-lg text-sm transition-colors",
                currentTrack === track ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/70 hover:text-white"
              )}
            >
              {track}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
