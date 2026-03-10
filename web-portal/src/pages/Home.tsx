import { useState, useMemo } from 'react';
import { Search as SearchIcon, SlidersHorizontal, Filter } from 'lucide-react';
import { Track, SearchType } from '../types/track';
import TrackCard from '../components/TrackCard';

const MOCK_TRACKS: Track[] = [
    { id: 1, title: 'Midnight City', artist: 'M83', genre: 'Synthpop', fileUrl: '#' },
    { id: 2, title: 'Starboy', artist: 'The Weeknd', genre: 'R&B', fileUrl: '#' },
    { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', genre: 'Pop', fileUrl: '#' },
    { id: 4, title: 'Thunderstruck', artist: 'AC/DC', genre: 'Rock', fileUrl: '#' },
    { id: 5, title: 'Humble', artist: 'Kendrick Lamar', genre: 'Hip-Hop', fileUrl: '#' },
    { id: 6, title: 'Master of Puppets', artist: 'Metallica', genre: 'Metal', fileUrl: '#' },
    { id: 7, title: 'Blinding Lights', artist: 'The Weeknd', genre: 'Pop', fileUrl: '#' },
    { id: 8, title: 'Heat Waves', artist: 'Glass Animals', genre: 'Indie', fileUrl: '#' },
];

const GENRES = ['Все', 'Pop', 'Rock', 'Synthpop', 'R&B', 'Hip-Hop', 'Metal', 'Indie'];

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState<SearchType>('title');
    const [selectedGenre, setSelectedGenre] = useState('Все');

    const filteredTracks = useMemo(() => {
        return MOCK_TRACKS.filter(track => {
            const matchesSearch = searchType === 'title'
                ? track.title.toLowerCase().includes(searchQuery.toLowerCase())
                : track.artist.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesGenre = selectedGenre === 'Все' || track.genre === selectedGenre;

            return matchesSearch && matchesGenre;
        });
    }, [searchQuery, searchType, selectedGenre]);

    return (
        <div className="space-y-10">
            {/* Панель управления (Поиск + Жанры) */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
                {/* Поиск */}
                <div className="flex-1 relative group">
                    <div className="absolute -inset-1 bg-blue-500/10 rounded-[1.8rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                    <div className="relative flex items-center bg-white/70 backdrop-blur-xl rounded-[1.5rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-1.5 transition-all duration-300 focus-within:shadow-[0_15px_50px_rgba(37,99,235,0.1)]">
                        <div className="flex bg-slate-100/80 rounded-xl p-1">
                            <button
                                onClick={() => setSearchType('title')}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${searchType === 'title' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                            >
                                ТРЕК
                            </button>
                            <button
                                onClick={() => setSearchType('artist')}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${searchType === 'artist' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                            >
                                АВТОР
                            </button>
                        </div>

                        <div className="flex-1 flex items-center px-4">
                            <SearchIcon className="text-slate-400 mr-3" size={18} />
                            <input
                                type="text"
                                placeholder={searchType === 'title' ? "Поиск по названию..." : "Поиск по артисту..."}
                                className="w-full bg-transparent border-none outline-none text-slate-800 text-sm placeholder:text-slate-400 font-semibold"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Фильтр по жанрам */}
                <div className="md:w-64 relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10 text-blue-600">
                        <Filter size={16} />
                    </div>
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="w-full h-full bg-white/70 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] rounded-[1.5rem] pl-11 pr-4 py-3 text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                        {GENRES.map(genre => (
                            <option key={genre} value={genre}>{genre.toUpperCase()}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-300">
                        <SlidersHorizontal size={14} />
                    </div>
                </div>
            </div>

            {/* Контентная область */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-[1px] flex-1 bg-slate-300/20"></div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        Библиотека / {selectedGenre} ({filteredTracks.length})
                    </div>
                    <div className="h-[1px] flex-1 bg-slate-300/20"></div>
                </div>

                {filteredTracks.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                        {filteredTracks.map(track => (
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