import { useState, useEffect } from 'react';
import { Search as SearchIcon, Filter, ChevronDown } from 'lucide-react';
import { Track } from '../types/track';
import TrackCard from '../components/TrackCard';
import { trackApi, genreApi } from '../api';

export default function Home() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [genres, setGenres] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState<'title' | 'artist'>('title');
    const [selectedGenre, setSelectedGenre] = useState('Все');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        genreApi.getGenres().then(res => {
            if (res.data) setGenres(res.data);
        }).catch(() => setGenres([]));
    }, []);

    useEffect(() => {
        setIsLoading(true);
        trackApi.getTracks(searchQuery, searchType, selectedGenre === 'Все' ? null : selectedGenre)
            .then(res => {
                setTracks(Array.isArray(res.data) ? res.data : []);
                setIsLoading(false);
            })
            .catch(() => {
                setTracks([]);
                setIsLoading(false);
            });
    }, [searchQuery, searchType, selectedGenre]);

    return (
        <div className="space-y-6 md:space-y-10">
            {/* Адаптивная строка поиска */}
            <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
                <div className={`flex-[4] flex items-center bg-white/90 backdrop-blur-2xl rounded-2xl md:rounded-[1.5rem] border-2 transition-all duration-500 shadow-xl overflow-hidden ${
                    searchType === 'title' ? 'border-pink-200 focus-within:border-pink-400' : 'border-blue-200 focus-within:border-blue-400'
                }`}>
                    <div className="relative h-full flex items-center">
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value as 'title' | 'artist')}
                            className={`h-full pl-3 md:pl-6 pr-8 md:pr-10 appearance-none bg-slate-50 border-r-2 border-inherit outline-none font-black text-[10px] uppercase cursor-pointer ${
                                searchType === 'title' ? 'text-pink-500' : 'text-blue-500'
                            }`}
                        >
                            <option value="title">Назв.</option>
                            <option value="artist">Автор</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-2 md:right-3 pointer-events-none text-slate-400" />
                    </div>

                    <input
                        type="text"
                        placeholder="Поиск..."
                        className="flex-1 bg-transparent border-none outline-none px-4 py-3 md:py-4 text-sm md:text-base font-bold text-slate-800 placeholder:text-slate-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="pr-4">
                        <SearchIcon className={searchType === 'title' ? 'text-pink-400' : 'text-blue-400'} size={18} />
                    </div>
                </div>

                <div className="md:flex-1">
                    <div className="relative h-full">
                        <select
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="w-full h-full bg-white/90 backdrop-blur-2xl border-2 border-slate-100 rounded-2xl md:rounded-[1.5rem] px-5 py-3 md:py-4 text-[10px] font-black text-slate-600 outline-none appearance-none cursor-pointer shadow-lg"
                        >
                            <option value="Все">ЖАНРЫ: ВСЕ</option>
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.id}>{genre.name.toUpperCase()}</option>
                            ))}
                        </select>
                        <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                    </div>
                </div>
            </div>

            {/* Сетка треков (2 колонки на мобилках) */}
            <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 px-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 shrink-0">Библиотека ({tracks.length})</span>
                    <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>

                {isLoading ? (
                    <div className="py-12 text-center text-slate-300 font-black animate-pulse text-xs">ЗАГРУЗКА...</div>
                ) : tracks.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
                        {tracks.map(track => <TrackCard key={track.id} track={track} />)}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-white/40 rounded-3xl border-2 border-dashed border-slate-200 mx-2">
                        <p className="font-black text-slate-300 uppercase text-xs">Ничего не найдено</p>
                    </div>
                )}
            </div>
        </div>
    );
}