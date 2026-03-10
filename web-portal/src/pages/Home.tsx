import { useState, useEffect } from 'react';
import { Search as SearchIcon, Filter, SlidersHorizontal } from 'lucide-react';
import { Track } from '../types/track';
import TrackCard from '../components/TrackCard';
import { trackApi, genreApi } from '../api';

export default function Home() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [genres, setGenres] = useState<any[]>([]); // Инициализируем пустым массивом
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('Все');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Загружаем жанры
        genreApi.getGenres()
            .then(res => {
                console.log("Жанры от сервера:", res.data);
                // Проверяем, что пришел именно массив
                if (Array.isArray(res.data)) {
                    setGenres(res.data);
                } else {
                    console.error("Сервер вернул не массив жанров:", res.data);
                    setGenres([]);
                }
            })
            .catch(err => {
                console.error("Ошибка при получении жанров:", err);
                setGenres([]);
            });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        trackApi.getTracks(searchQuery, selectedGenre === 'Все' ? null : selectedGenre)
            .then(res => {
                console.log("Треки от сервера:", res.data);
                if (Array.isArray(res.data)) {
                    setTracks(res.data);
                } else {
                    setTracks([]);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Ошибка при получении треков:", err);
                setTracks([]);
                setIsLoading(false);
            });
    }, [searchQuery, selectedGenre]);

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
                <div className="flex-1 relative group">
                    <div className="relative flex items-center bg-white/70 backdrop-blur-xl rounded-[1.5rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-1.5 transition-all duration-300 focus-within:shadow-[0_15px_50px_rgba(37,99,235,0.1)]">
                        <div className="flex-1 flex items-center px-4">
                            <SearchIcon className="text-slate-400 mr-3" size={18} />
                            <input
                                type="text"
                                placeholder="Поиск по названию или артисту..."
                                className="w-full bg-transparent border-none outline-none text-slate-800 text-sm placeholder:text-slate-400 font-semibold"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="md:w-64 relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10 text-blue-600">
                        <Filter size={16} />
                    </div>
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="w-full h-full bg-white/70 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] rounded-[1.5rem] pl-11 pr-4 py-3 text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                        <option value="Все">ВСЕ ЖАНРЫ</option>
                        {Array.isArray(genres) && genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name ? genre.name.toUpperCase() : 'БЕЗ НАЗВАНИЯ'}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-300">
                        <SlidersHorizontal size={14} />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-[1px] flex-1 bg-slate-300/20"></div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        Библиотека ({tracks.length})
                    </div>
                    <div className="h-[1px] flex-1 bg-slate-300/20"></div>
                </div>

                {isLoading ? (
                    <div className="py-24 text-center text-slate-400 font-black animate-pulse">ЗАГРУЗКА...</div>
                ) : tracks.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                        {tracks.map(track => (
                            <TrackCard key={track.id} track={track} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center bg-white/30 backdrop-blur-md rounded-[2.5rem] border border-white">
                        <SearchIcon size={48} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-slate-400 font-black uppercase tracking-tighter">Треки не найдены</p>
                    </div>
                )}
            </div>
        </div>
    );
}