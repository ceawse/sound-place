import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Music as MusicIcon } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function MusicPlayer() {
    const { currentTrack, isPlaying, togglePlay } = usePlayer();
    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);

    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Инициализация визуализатора
    useEffect(() => {
        if (audioRef.current && !analyserRef.current) {
            try {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                const context = new AudioContext();
                const src = context.createMediaElementSource(audioRef.current);
                const analyser = context.createAnalyser();

                // Важно: Соединяем источник с анализатором, а анализатор с выходом
                src.connect(analyser);
                analyser.connect(context.destination);

                analyser.fftSize = 256;
                analyserRef.current = analyser;
                audioCtxRef.current = context;
            } catch (e) {
                console.error("Visualizer error:", e);
            }
        }
    }, [currentTrack]);

    // Рисование
    useEffect(() => {
        if (isPlaying) {
            // Браузеры блокируют AudioContext до первого клика
            if (audioCtxRef.current?.state === 'suspended') {
                audioCtxRef.current.resume();
            }

            const draw = () => {
                if (!analyserRef.current || !canvasRef.current) return;
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const bufferLength = analyserRef.current.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyserRef.current.getByteFrequencyData(dataArray);

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Настройка толщины линий (сделал чуть толще, чем "иголки")
                const barWidth = 3;
                const gap = 2;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    const barHeight = dataArray[i] / 3;

                    // Рисуем градиентные столбики
                    const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
                    gradient.addColorStop(0, '#3b82f6');
                    gradient.addColorStop(1, '#ec4899');

                    ctx.fillStyle = gradient;
                    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                    x += barWidth + gap;
                    if (x > canvas.width) break;
                }
                animationRef.current = requestAnimationFrame(draw);
            };
            draw();
        } else {
            cancelAnimationFrame(animationRef.current);
        }
        return () => cancelAnimationFrame(animationRef.current);
    }, [isPlaying]);

    // Громкость
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    // Состояние воспроизведения
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.play().catch(() => {});
            else audioRef.current.pause();
        }
    }, [isPlaying, currentTrack]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTo = parseFloat(e.target.value);
        if (audioRef.current && duration) {
            audioRef.current.currentTime = (seekTo / 100) * duration;
            setProgress(seekTo);
        }
    };

    if (!currentTrack) return null;

    return (
        <div className="fixed bottom-4 md:bottom-6 left-0 right-0 px-4 md:left-1/2 md:-translate-x-1/2 w-full md:max-w-3xl z-[100] animate-in slide-in-from-bottom-10">
            <audio
                ref={audioRef}
                src={`http://localhost:8082${currentTrack.fileUrl}`}
                crossOrigin="anonymous"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                onEnded={togglePlay}
            />

            <div className="bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-3 shadow-2xl flex items-center gap-4 relative overflow-hidden">
                {/* Визуализатор */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" width={600} height={80} />

                {/* Инфо */}
                <div className="flex items-center gap-3 shrink-0 z-10 w-32 md:w-40">
                    <div className="relative shrink-0">
                        {currentTrack.coverUrl ? (
                            <img src={`http://localhost:8082${currentTrack.coverUrl}`} className="w-10 h-10 rounded-lg object-cover border border-white/10" alt="" />
                        ) : (
                            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                                <MusicIcon className="text-pink-500" size={16} />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-white font-black text-[10px] truncate uppercase tracking-tight">{currentTrack.title}</h4>
                        <p className="text-slate-500 font-bold text-[8px] uppercase truncate">{currentTrack.artist}</p>
                    </div>
                </div>

                {/* Управление */}
                <button onClick={togglePlay} className="z-20 bg-white text-slate-900 p-3 rounded-full shrink-0 shadow-lg hover:scale-105 active:scale-95 transition-all">
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} className="ml-0.5" fill="currentColor" />}
                </button>

                {/* Перемотка */}
                <div className="flex-1 flex flex-col gap-1 z-20">
                    <div className="flex justify-between items-center text-[8px] font-black px-1">
                        <span className="text-pink-500">{formatTime(currentTime)}</span>
                        <span className="text-slate-500">{formatTime(duration)}</span>
                    </div>
                    <div className="relative flex items-center h-4 group">
                        <div className="absolute w-full h-1 bg-white/10 rounded-full"></div>
                        <div className="absolute h-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full" style={{ width: `${progress}%` }}></div>
                        <input
                            type="range" min="0" max="100" step="0.1" value={progress || 0} onChange={handleSeek}
                            className="relative w-full h-full bg-transparent appearance-none cursor-pointer accent-white opacity-0 md:group-hover:opacity-100 transition-opacity"
                        />
                    </div>
                </div>

                {/* Громкость - ИСПРАВЛЕНО */}
                <div className="flex items-center gap-2 z-30 shrink-0 border-l border-white/10 pl-3">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-slate-400 hover:text-white transition-colors p-1"
                    >
                        {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                            const newVol = parseFloat(e.target.value);
                            setVolume(newVol);
                            setIsMuted(false);
                        }}
                        className="w-16 md:w-20 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-pink-500 hover:accent-pink-400"
                    />
                </div>
            </div>
        </div>
    );
}