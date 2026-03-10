import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { PlayerProvider } from './context/PlayerContext';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
    return (
        <PlayerProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="admin" element={<Admin />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
                <MusicPlayer />
            </HashRouter>
        </PlayerProvider>
    );
}