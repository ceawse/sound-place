import { Link, Outlet, useLocation } from 'react-router-dom';
import { PlusCircle, Headphones, Search } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const navLinkClass = (path: string) => `
    flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all duration-300
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
        </div>

        {/* Навигация стала более компактной на мобилках */}
        <nav className="sticky top-2 md:top-4 z-50 mx-auto w-full max-w-5xl px-3 md:px-6">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/60 shadow-xl rounded-2xl px-4 md:px-6 h-12 md:h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1 rounded-lg shadow-lg shadow-blue-100">
                <Headphones size={14} className="text-white" />
              </div>
              <span className="font-black text-sm md:text-lg tracking-tighter text-slate-900 uppercase">
                Музыка
              </span>
            </Link>

            <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl">
              <Link to="/" className={navLinkClass('/')}>
                <Search size={12} />
                <span className="hidden xs:inline">Поиск</span>
              </Link>
              <Link to="/admin" className={navLinkClass('/admin')}>
                <PlusCircle size={12} />
                <span className="hidden xs:inline">Админ</span>
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <Outlet />
        </main>
      </div>
  );
}