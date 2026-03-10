import { Download, PlayCircle, User } from 'lucide-react';
import { Track } from '../types/track';

interface TrackCardProps {
    track: Track;
}

export default function TrackCard({ track }: TrackCardProps) {
    return (
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            {/* Cover Image Placeholder */}
            <div className="relative aspect-square mb-5 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
                <PlayCircle size={40} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50 flex items-center justify-center">
                    <div className="text-slate-200 font-black text-6xl select-none">MUSIC</div>
                </div>
            </div>

            <div className="space-y-1.5 px-1">
                <h3 className="font-bold text-slate-900 truncate text-lg leading-tight" title={track.title}>
                    {track.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium leading-none">
                    <User size={14} className="text-slate-400" />
                    <span className="truncate">{track.artist}</span>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {track.genre}
        </span>

                <a
                    href={track.fileUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-slate-200"
                >
                    <Download size={14} />
                    Скачать
                </a>
            </div>
        </div>
    );
}