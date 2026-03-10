export interface Track {
    id: number;
    title: string;
    artist: string;
    genre: string;
    duration?: string;
    coverUrl?: string; // Ссылка на картинку (заглушку)
    fileUrl: string;   // Ссылка для скачивания
}

export type SearchType = 'title' | 'artist';