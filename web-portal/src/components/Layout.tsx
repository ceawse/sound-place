import { Link, Outlet, useLocation } from 'react-router-dom';
import { PlusCircle, Headphones, Search } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navLinkClass = (path: string) => `
    flex items-center gap-2 px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300
    ${location.pathname === path
      ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
      : 'text-slate-500 hover:text-slate-900'}
  `;

  return (
      <div className="relative min-h-screen flex flex-col">
        <div className="bg-blobs"></div>
        <div className="blobs-container">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <nav className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-6">
          <div className="bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-2xl px-6 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-100">
                <Headphones size={16} className="text-white" />
              </div>
              <span className="font-black text-lg tracking-tighter text-slate-900 uppercase">
                Музыка
              </span>
            </Link>

            <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/20">
              <Link to="/" className={navLinkClass('/')}>
                <Search size={12} />
                <span>Поиск</span>
              </Link>
              <Link to="/admin" className={navLinkClass('/admin')}>
                <PlusCircle size={12} />
                <span>Админ</span>
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </main>
      </div>
  );
}