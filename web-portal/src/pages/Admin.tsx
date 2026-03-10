import { useState } from 'react';
import { Upload, Plus, Music, User, FolderPlus, CheckCircle2, X } from 'lucide-react';

export default function Admin() {
    // Состояние формы трека
    const [trackData, setTrackData] = useState({
        title: '',
        artist: '',
        genreId: '',
        file: null as File | null
    });

    // Состояние жанров (заглушка)
    const [genres, setGenres] = useState([
        { id: 1, name: 'Synthwave' },
        { id: 2, name: 'Pop' },
        { id: 3, name: 'Rock' }
    ]);

    // Состояние для создания нового жанра
    const [newGenre, setNewGenre] = useState('');
    const [showGenreInput, setShowGenreInput] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setTrackData({ ...trackData, file: e.target.files[0] });
        }
    };

    const addGenre = () => {
        if (newGenre.trim()) {
            const nextId = genres.length + 1;
            setGenres([...genres, { id: nextId, name: newGenre }]);
            setNewGenre('');
            setShowGenreInput(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Тут будет отправка FormData на бэкенд
        console.log('Отправка данных:', trackData);
        alert('Трек успешно добавлен (имитация)');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <div className="flex items-center justify-between px-4">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Управление базой</h2>
                <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-2xl text-sm font-bold">
                    <CheckCircle2 size={18} />
                    Админ-режим
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Левая колонка: Форма загрузки */}
                <div className="md:col-span-2 space-y-6">
                    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md border border-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
                        <div className="flex items-center gap-3 mb-4 text-slate-400">
                            <Music size={20} />
                            <span className="text-xs font-black uppercase tracking-widest">Информация о треке</span>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="relative group">
                                <input
                                    required
                                    type="text"
                                    placeholder="Название трека"
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-800 placeholder:text-slate-300"
                                    value={trackData.title}
                                    onChange={e => setTrackData({ ...trackData, title: e.target.value })}
                                />
                            </div>

                            <div className="relative group">
                                <input
                                    required
                                    type="text"
                                    placeholder="Исполнитель"
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-800 placeholder:text-slate-300"
                                    value={trackData.artist}
                                    onChange={e => setTrackData({ ...trackData, artist: e.target.value })}
                                />
                            </div>

                            {/* Выбор файла */}
                            <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                                <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="text-blue-600" size={28} />
                                </div>
                                <span className="font-bold text-slate-700">
                  {trackData.file ? trackData.file.name : 'Выберите MP3 файл'}
                </span>
                                <span className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wider">Максимальный размер: 20MB</span>
                                <input type="file" accept="audio/mpeg" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-xl shadow-slate-200 uppercase tracking-widest text-sm"
                        >
                            Опубликовать трек
                        </button>
                    </form>
                </div>

                {/* Правая колонка: Категории / Жанры */}
                <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2.5rem] shadow-xl">
                        <div className="flex items-center justify-between mb-6 text-slate-400">
                            <div className="flex items-center gap-2">
                                <FolderPlus size={18} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Жанры</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="grid grid-cols-1 gap-2">
                                {genres.map(genre => (
                                    <button
                                        key={genre.id}
                                        onClick={() => setTrackData({ ...trackData, genreId: genre.id.toString() })}
                                        className={`text-left px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                                            trackData.genreId === genre.id.toString()
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                    >
                                        {genre.name.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                {showGenreInput ? (
                                    <div className="flex flex-col gap-2">
                                        <input
                                            autoFocus
                                            type="text"
                                            placeholder="Название жанра..."
                                            className="w-full bg-slate-100 border-none rounded-xl py-2 px-4 outline-none text-xs font-bold"
                                            value={newGenre}
                                            onChange={e => setNewGenre(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addGenre()}
                                        />
                                        <div className="flex gap-2">
                                            <button onClick={addGenre} className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-[10px] font-black uppercase">ОК</button>
                                            <button onClick={() => setShowGenreInput(false)} className="bg-slate-200 text-slate-500 p-2 rounded-xl leading-none">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowGenreInput(true)}
                                        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 text-slate-400 py-3 rounded-xl hover:border-blue-400 hover:text-blue-500 transition-all font-bold text-xs"
                                    >
                                        <Plus size={14} />
                                        НОВЫЙ ЖАНР
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
                        <Music className="absolute -right-4 -bottom-4 text-blue-500 rotate-12 group-hover:scale-125 transition-transform" size={120} />
                        <div className="relative z-10">
                            <h4 className="font-black text-lg leading-tight mb-2">Совет</h4>
                            <p className="text-blue-100 text-xs font-medium leading-relaxed">
                                Убедитесь, что название трека и имя автора написаны без ошибок. Это поможет пользователям легче находить вашу музыку через поиск.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}