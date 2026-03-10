import { Download, PlayCircle, PauseCircle, User } from 'lucide-react';
import { Track } from '../types/track';
import { usePlayer } from '../context/PlayerContext';

interface TrackCardProps {
    track: Track;
}

export default function TrackCard({ track }: TrackCardProps) {
    const { currentTrack, isPlaying, playTrack } = usePlayer();

    // Проверяем, играет ли именно этот трек в данный момент
    const isCurrentTrack = currentTrack?.id === track.id;
    const isThisPlaying = isCurrentTrack && isPlaying;

    // Ссылка на файл для скачивания
    const fullFileUrl = `http://localhost:8082${track.fileUrl}`;

    return (
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-3.5 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 group">

            {/* Обложка / Зона клика для проигрывания */}
            <div
                onClick={() => playTrack(track)}
                className="relative aspect-square mb-4 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-50 cursor-pointer"
            >
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 transition-opacity duration-500 ${isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                {/* Иконка Play/Pause */}
                <div className={`z-10 transition-all duration-500 transform ${isThisPlaying ? 'scale-110 opacity-100' : 'scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100'}`}>
                    {isThisPlaying ? (
                        <PauseCircle size={48} className="text-blue-600 fill-white" />
                    ) : (
                        <PlayCircle size={48} className="text-slate-900 fill-white/80" />
                    )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-slate-200 font-black text-4xl select-none tracking-tighter transition-transform duration-700 ${isThisPlaying ? 'scale-110 blur-sm' : 'group-hover:scale-110'}`}>
                        MP3
                    </div>
                </div>
            </div>

            {/* Инфо о треке */}
            <div className="space-y-1 px-1">
                <h3 className="font-bold text-slate-900 truncate text-sm tracking-tight" title={track.title}>
                    {track.title}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold">
                    <User size={12} className="text-slate-300" />
                    <span className="truncate">{track.artist}</span>
                </div>
            </div>

            {/* Футер карточки: Жанр и Скачивание */}
            <div className="mt-5 flex items-center justify-between gap-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                  {track.genreName || 'МУЗЫКА'}
                </span>

                <a
                    href={fullFileUrl}
                    download
                    onClick={(e) => e.stopPropagation()} // Чтобы при клике на загрузку не включался плеер
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-900 hover:bg-blue-600 text-white text-[10px] font-black rounded-xl transition-all shadow-lg shadow-slate-200"
                >
                    <Download size={12} />
                    <span>SAVE</span>
                </a>
            </div>
        </div>
    );
}