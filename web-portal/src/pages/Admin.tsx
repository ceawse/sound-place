import React, { useState, useEffect } from 'react';
import { Upload, Plus, Music, FolderPlus, X } from 'lucide-react';
import { trackApi, genreApi } from '../api';

export default function Admin() {
    const [genres, setGenres] = useState<any[]>([]); // Всегда инициализируем массивом
    const [trackData, setTrackData] = useState({
        title: '',
        artist: '',
        genreId: '',
        file: null as File | null
    });
    const [newGenre, setNewGenre] = useState('');
    const [showGenreInput, setShowGenreInput] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Загрузка жанров при входе на страницу
    const loadGenres = async () => {
        try {
            const res = await genreApi.getGenres();
            console.log("Жанры в админке:", res.data);
            if (Array.isArray(res.data)) {
                setGenres(res.data);
            } else {
                setGenres([]);
            }
        } catch (error) {
            console.error("Ошибка загрузки жанров:", error);
            setGenres([]);
        }
    };

    useEffect(() => {
        loadGenres();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setTrackData({ ...trackData, file: e.target.files[0] });
        }
    };

    const addGenre = async () => {
        if (newGenre.trim()) {
            try {
                await genreApi.createGenre(newGenre);
                setNewGenre('');
                setShowGenreInput(false);
                loadGenres(); // Обновляем список
            } catch (error) {
                alert("Ошибка при создании жанра");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackData.file || !trackData.genreId) {
            alert("Пожалуйста, выберите файл и жанр!");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('title', trackData.title);
        formData.append('artist', trackData.artist);
        formData.append('genreId', trackData.genreId);
        formData.append('file', trackData.file);

        try {
            await trackApi.uploadTrack(formData);
            alert('Трек успешно опубликован!');
            setTrackData({ title: '', artist: '', genreId: '', file: null });
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            alert('Ошибка при загрузке трека на сервер');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <div className="flex items-center justify-between px-4">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Управление базой</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md border border-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
                        <div className="flex items-center gap-3 mb-4 text-slate-400">
                            <Music size={20} />
                            <span className="text-xs font-black uppercase tracking-widest">Информация о треке</span>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <input
                                required
                                type="text"
                                placeholder="Название трека"
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                                value={trackData.title}
                                onChange={e => setTrackData({ ...trackData, title: e.target.value })}
                            />

                            <input
                                required
                                type="text"
                                placeholder="Исполнитель"
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                                value={trackData.artist}
                                onChange={e => setTrackData({ ...trackData, artist: e.target.value })}
                            />

                            <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                                <Upload className="text-blue-600 mb-4" size={28} />
                                <span className="font-bold text-slate-700 text-center">
                                    {trackData.file ? trackData.file.name : 'Выберите MP3 файл'}
                                </span>
                                <input type="file" accept="audio/mpeg" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>

                        <button
                            disabled={isUploading}
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-xl uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isUploading ? 'ЗАГРУЗКА...' : 'ОПУБЛИКОВАТЬ ТРЕК'}
                        </button>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2.5rem] shadow-xl">
                        <div className="flex items-center gap-2 mb-6 text-slate-400">
                            <FolderPlus size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Выберите Жанр</span>
                        </div>

                        <div className="space-y-2">
                            {Array.isArray(genres) && genres.length > 0 ? (
                                genres.map(genre => (
                                    <button
                                        key={genre.id}
                                        type="button"
                                        onClick={() => setTrackData({ ...trackData, genreId: genre.id.toString() })}
                                        className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                                            trackData.genreId === genre.id.toString()
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                    >
                                        {genre.name.toUpperCase()}
                                    </button>
                                ))
                            ) : (
                                <div className="text-[10px] text-slate-400 text-center py-4">Жанры еще не созданы</div>
                            )}

                            <div className="pt-4 border-t border-slate-100 mt-4">
                                {showGenreInput ? (
                                    <div className="flex flex-col gap-2">
                                        <input
                                            autoFocus
                                            type="text"
                                            placeholder="Название..."
                                            className="w-full bg-slate-100 rounded-xl py-2 px-4 text-xs font-bold outline-none"
                                            value={newGenre}
                                            onChange={e => setNewGenre(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addGenre()}
                                        />
                                        <div className="flex gap-2">
                                            <button onClick={addGenre} className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-[10px] font-black uppercase">ОК</button>
                                            <button onClick={() => setShowGenreInput(false)} className="bg-slate-200 text-slate-500 p-2 rounded-xl"><X size={14}/></button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setShowGenreInput(true)}
                                        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 text-slate-400 py-3 rounded-xl hover:border-blue-400 hover:text-blue-500 transition-all font-bold text-xs"
                                    >
                                        <Plus size={14} /> НОВЫЙ ЖАНР
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}