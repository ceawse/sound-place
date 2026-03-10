import { Download, PlayCircle, User } from 'lucide-react';
import { Track } from '../types/track';

interface TrackCardProps {
    track: Track;
}

export default function TrackCard({ track }: TrackCardProps) {
    return (
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-3.5 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 group">
            <div className="relative aspect-square mb-4 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <PlayCircle size={40} className="text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-slate-200 font-black text-4xl select-none tracking-tighter group-hover:scale-110 transition-transform duration-700">MP3</div>
                </div>
            </div>

            <div className="space-y-1 px-1">
                <h3 className="font-bold text-slate-900 truncate text-sm tracking-tight" title={track.title}>
                    {track.title}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold">
                    <User size={12} className="text-slate-300" />
                    <span className="truncate">{track.artist}</span>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                  {track.genre}
                </span>
                <a
                    href={track.fileUrl}
                    download
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-900 hover:bg-blue-600 text-white text-[10px] font-black rounded-xl transition-all shadow-lg shadow-slate-200"
                >
                    <Download size={12} />
                    <span>DOWNLOAD</span>
                </a>
            </div>
        </div>
    );
}