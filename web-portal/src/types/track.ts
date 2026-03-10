export interface Track {
    id: number;
    title: string;
    artist: string;
    genreName: string;
    fileUrl: string;
    coverUrl?: string; // Добавили поле
    createdAt: string;
}
export type SearchType = 'title' | 'artist';