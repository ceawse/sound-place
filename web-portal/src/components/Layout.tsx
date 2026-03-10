import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutGrid, PlusCircle, Headphones, Search } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navLinkClass = (path: string) => `
    flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold transition-all duration-300
    ${location.pathname === path
      ? 'bg-white text-blue-600 shadow-sm'
      : 'text-slate-500 hover:text-slate-900'}
  `;

  return (
      <div className="relative min-h-screen flex flex-col">
        {/* Background Decor */}
        <div className="bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        {/* Modern Top Navbar */}
        <nav className="sticky top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-5xl">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] px-8 h-16 flex items-center justify-between">

            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-xl shadow-lg shadow-blue-200">
                <Headphones size={18} className="text-white" />
              </div>
              <span className="font-black text-xl tracking-tighter text-slate-800">
              TRACK<span className="text-blue-600">BASE</span>
            </span>
            </Link>

            <div className="flex items-center bg-slate-100/50 p-1 rounded-[1.5rem]">
              <Link to="/" className={navLinkClass('/')}>
                <Search size={16} />
                <span>Поиск</span>
              </Link>
              <Link to="/admin" className={navLinkClass('/admin')}>
                <PlusCircle size={16} />
                <span>Админка</span>
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
          <Outlet />
        </main>
      </div>
  );
}