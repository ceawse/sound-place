import { useState, useMemo } from 'react';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { Track, SearchType } from '../types/track';
import TrackCard from '../components/TrackCard';

const MOCK_TRACKS: Track[] = [
    { id: 1, title: 'Midnight City', artist: 'M83', genre: 'Synthpop', fileUrl: '#' },
    { id: 2, title: 'Starboy', artist: 'The Weeknd', genre: 'R&B', fileUrl: '#' },
    { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', genre: 'Pop', fileUrl: '#' },
    { id: 4, title: 'Thunderstruck', artist: 'AC/DC', genre: 'Rock', fileUrl: '#' },
    { id: 5, title: 'Humble', artist: 'Kendrick Lamar', genre: 'Hip-Hop', fileUrl: '#' },
    { id: 6, title: 'Master of Puppets', artist: 'Metallica', genre: 'Metal', fileUrl: '#' },
];

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState<SearchType>('title');

    const filteredTracks = useMemo(() => {
        return MOCK_TRACKS.filter(track => {
            const query = searchQuery.toLowerCase();
            return searchType === 'title'
                ? track.title.toLowerCase().includes(query)
                : track.artist.toLowerCase().includes(query);
        });
    }, [searchQuery, searchType]);

    return (
        <div className="space-y-16 mt-10">
            {/* Super Minimal Search Section */}
            <div className="flex flex-col items-center justify-center space-y-10">
                <div className="w-full max-w-3xl relative">
                    <div className="relative flex items-center bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white shadow-2xl p-3 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-500">

                        {/* Filter Toggle */}
                        <div className="flex bg-slate-100 rounded-[2rem] p-1">
                            <button
                                onClick={() => setSearchType('title')}
                                className={`px-6 py-2 rounded-[1.5rem] text-xs font-bold transition-all ${searchType === 'title' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                            >
                                ТРЕК
                            </button>
                            <button
                                onClick={() => setSearchType('artist')}
                                className={`px-6 py-2 rounded-[1.5rem] text-xs font-bold transition-all ${searchType === 'artist' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                            >
                                АВТОР
                            </button>
                        </div>

                        {/* Main Input */}
                        <div className="flex-1 flex items-center px-6">
                            <SearchIcon className="text-slate-300 mr-4" size={24} />
                            <input
                                type="text"
                                placeholder={searchType === 'title' ? "Название композиции..." : "Имя исполнителя..."}
                                className="w-full bg-transparent border-none outline-none text-slate-800 text-lg placeholder:text-slate-300 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="space-y-8">
                <div className="flex items-center gap-4 px-2">
                    <SlidersHorizontal size={18} className="text-blue-600" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                        Библиотека контента
                    </h3>
                    <div className="h-[1px] flex-1 bg-slate-200/50"></div>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            {filteredTracks.length} ITEM
          </span>
                </div>

                {filteredTracks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {filteredTracks.map(track => (
                            <TrackCard key={track.id} track={track} />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white/50">
                        <SearchIcon size={48} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-slate-400 font-bold uppercase tracking-tighter">Ничего не найдено</p>
                    </div>
                )}
            </div>
        </div>
    );
}