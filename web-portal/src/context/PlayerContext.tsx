import React, { createContext, useState, useContext, useRef } from 'react';
import { Track } from '../types/track';

interface PlayerContextType {
    currentTrack: Track | null;
    isPlaying: boolean;
    playTrack: (track: Track) => void;
    togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playTrack = (track: Track) => {
        if (currentTrack?.id === track.id) {
            togglePlay();
            return;
        }
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <PlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, togglePlay }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) throw new Error('usePlayer must be used within PlayerProvider');
    return context;
};