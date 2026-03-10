import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, Music as MusicIcon } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function MusicPlayer() {
    const { currentTrack, isPlaying, togglePlay } = usePlayer();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(() => {});
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    if (!currentTrack) return null;

    const fullUrl = `http://localhost:8082${currentTrack.fileUrl}`;

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const val = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(val);
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-[100] animate-in slide-in-from-bottom-10 duration-500">
            <audio
                ref={audioRef}
                src={fullUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={togglePlay}
            />

            <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl flex items-center gap-4 text-white">
                {/* Инфо */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
                        <MusicIcon size={20} />
                    </div>
                    <div className="min-w-0">
                        <h4 className="font-bold text-sm truncate uppercase tracking-tight">{currentTrack.title}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{currentTrack.artist}</p>
                    </div>
                </div>

                {/* Прогресс (мини) */}
                <div className="hidden md:block flex-[2] bg-white/10 h-1.5 rounded-full overflow-hidden relative">
                    <div
                        className="absolute inset-y-0 left-0 bg-blue-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Управление */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={togglePlay}
                        className="bg-white text-slate-900 p-3 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg"
                    >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                    </button>
                    <div className="hidden sm:flex items-center gap-2 text-slate-400">
                        <Volume2 size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}