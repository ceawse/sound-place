import { Download, PlayCircle, PauseCircle, User } from 'lucide-react';
import { Track } from '../types/track';
import { usePlayer } from '../context/PlayerContext';

interface TrackCardProps {
    track: Track;
}

export default function TrackCard({ track }: TrackCardProps) {
    const { currentTrack, isPlaying, playTrack } = usePlayer();
    const isCurrentTrack = currentTrack?.id === track.id;
    const isThisPlaying = isCurrentTrack && isPlaying;

    const fullFileUrl = `http://localhost:8082${track.fileUrl}`;
    const fullCoverUrl = track.coverUrl ? `http://localhost:8082${track.coverUrl}` : null;

    return (
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-3 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group">

            {/* Контейнер обложки */}
            <div className="relative aspect-square mb-3.5 rounded-2xl overflow-hidden cursor-pointer shadow-inner">
                {/* Изображение или заглушка */}
                <div onClick={() => playTrack(track)} className="w-full h-full bg-slate-100 flex items-center justify-center">
                    {fullCoverUrl ? (
                        <img src={fullCoverUrl} alt={track.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                        <div className="text-slate-200 font-black text-3xl tracking-tighter">MP3</div>
                    )}
                </div>

                {/* Кнопка SAVE (Download) в углу */}
                <a
                    href={fullFileUrl}
                    download
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 z-20 p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                    title="Скачать трек"
                >
                    <Download size={14} strokeWidth={3} />
                </a>

                {/* Оверлей при наведении для Play */}
                <div
                    onClick={() => playTrack(track)}
                    className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                    <div className="transform transition-transform duration-500 scale-90 group-hover:scale-100">
                        {isThisPlaying ? (
                            <PauseCircle size={42} className="text-white fill-blue-600" />
                        ) : (
                            <PlayCircle size={42} className="text-white fill-slate-900/40" />
                        )}
                    </div>
                </div>
            </div>

            {/* Инфо трека */}
            <div className="space-y-1.5 px-1 pb-1">
                <h3 className="font-bold text-slate-900 truncate text-[13px] tracking-tight" title={track.title}>
                    {track.title}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                    <User size={10} className="text-slate-300" />
                    <span className="truncate uppercase tracking-wider">{track.artist}</span>
                </div>

                {/* Жанр (Теперь на всю ширину и с обрезкой) */}
                <div className="pt-2">
                    <span className="inline-block max-w-full text-[8px] font-black uppercase tracking-widest text-blue-600 bg-blue-50/50 px-2 py-1 rounded-lg truncate border border-blue-100/50">
                      {track.genreName || 'МУЗЫКА'}
                    </span>
                </div>
            </div>
        </div>
    );
}