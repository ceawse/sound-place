import React, { useState, useEffect } from 'react';
import { Upload, Plus, Music, FolderPlus, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { trackApi, genreApi } from '../api';

export default function Admin() {
    const [genres, setGenres] = useState<any[]>([]);
    const [tracks, setTracks] = useState<any[]>([]);
    const [trackData, setTrackData] = useState({
        title: '', artist: '', genreId: '', file: null as File | null, cover: null as File | null
    });
    const [newGenre, setNewGenre] = useState('');
    const [showGenreInput, setShowGenreInput] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const loadData = async () => {
        try {
            const [gRes, tRes] = await Promise.all([
                genreApi.getGenres(),
                trackApi.getTracks('', 'all', null)
            ]);
            if (gRes.data) setGenres(gRes.data);
            if (tRes.data) setTracks(tRes.data);
        } catch (error) {}
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackData.file || !trackData.genreId) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('title', trackData.title);
        formData.append('artist', trackData.artist);
        formData.append('genreId', trackData.genreId);
        formData.append('file', trackData.file);
        if (trackData.cover) formData.append('cover', trackData.cover);
        try {
            await trackApi.uploadTrack(formData);
            setTrackData({ title: '', artist: '', genreId: '', file: null, cover: null });
            loadData();
        } catch (error) {} finally { setIsUploading(false); }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-24">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 px-2">Управление</h2>

            {/* Сетка переключается с 3 колонок на 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Форма */}
                <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
                    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl border border-white p-5 md:p-8 rounded-3xl shadow-xl space-y-4">
                        <input required placeholder="Название трека" className="w-full bg-slate-50 rounded-xl py-3 px-5 outline-none font-bold text-sm" value={trackData.title} onChange={e => setTrackData({ ...trackData, title: e.target.value })} />
                        <input required placeholder="Исполнитель" className="w-full bg-slate-50 rounded-xl py-3 px-5 outline-none font-bold text-sm" value={trackData.artist} onChange={e => setTrackData({ ...trackData, artist: e.target.value })} />

                        <div className="grid grid-cols-2 gap-3">
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:bg-blue-50 cursor-pointer">
                                <Music className="text-blue-500 mb-1" size={20} />
                                <span className="text-[8px] font-black uppercase truncate w-full text-center">{trackData.file ? 'Файл есть' : 'MP3'}</span>
                                <input type="file" accept="audio/mpeg" className="hidden" onChange={e => e.target.files && setTrackData({...trackData, file: e.target.files[0]})} />
                            </label>
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:bg-pink-50 cursor-pointer">
                                <ImageIcon className="text-pink-500 mb-1" size={20} />
                                <span className="text-[8px] font-black uppercase truncate w-full text-center">{trackData.cover ? 'Обложка есть' : 'IMG'}</span>
                                <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files && setTrackData({...trackData, cover: e.target.files[0]})} />
                            </label>
                        </div>
                        <button disabled={isUploading} className="w-full bg-slate-900 text-white font-black py-4 rounded-xl shadow-lg text-xs uppercase tracking-widest">
                            {isUploading ? 'ЗАГРУЗКА...' : 'ОПУБЛИКОВАТЬ'}
                        </button>
                    </form>

                    {/* Список треков для удаления */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white p-5 md:p-8 rounded-3xl shadow-xl">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-4">Треки в базе</span>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                            {tracks.map(track => (
                                <div key={track.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                                            {track.coverUrl && <img src={`http://localhost:8082${track.coverUrl}`} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="text-[10px] font-black uppercase truncate w-32 md:w-auto">{track.title}</div>
                                    </div>
                                    <button onClick={async () => { if(window.confirm('Удалить?')) { await trackApi.deleteTrack(track.id); loadData(); } }} className="text-slate-300 hover:text-red-500 p-2"><Trash2 size={16}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Жанры (На мобилках уходят наверх или вниз) */}
                <div className="lg:col-span-1 order-1 lg:order-2">
                    <div className="bg-white/70 backdrop-blur-xl border border-white p-5 rounded-3xl shadow-xl">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-4">Жанр</span>
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                            {genres.map(genre => (
                                <button key={genre.id} onClick={() => setTrackData({ ...trackData, genreId: genre.id.toString() })} className={`text-left px-3 py-2 rounded-lg font-bold text-[10px] transition-all ${trackData.genreId === genre.id.toString() ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-500'}`}>
                                    {genre.name.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        {/* Поле добавления жанра */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                             {showGenreInput ? (
                                <div className="flex gap-1">
                                    <input className="flex-1 bg-slate-100 rounded-lg px-3 py-2 text-[10px] outline-none" value={newGenre} onChange={e => setNewGenre(e.target.value)} />
                                    <button onClick={async () => { await genreApi.createGenre(newGenre); setNewGenre(''); setShowGenreInput(false); loadData(); }} className="bg-blue-600 text-white px-3 rounded-lg text-[10px] font-black">OK</button>
                                </div>
                             ) : (
                                <button onClick={() => setShowGenreInput(true)} className="w-full border-2 border-dashed border-slate-200 text-slate-400 py-2 rounded-lg text-[10px] font-black">+ НОВЫЙ</button>
                             )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}