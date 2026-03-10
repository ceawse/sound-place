import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin'; // Импорт новой страницы

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="admin" element={<Admin />} /> {/* Подключаем админку */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}