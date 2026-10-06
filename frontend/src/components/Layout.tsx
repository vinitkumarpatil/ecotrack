import { Outlet, Link, useLocation } from 'react-router-dom';
import { Leaf, LayoutDashboard, PlusCircle, History } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Layout = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Log Activity', path: '/log', icon: PlusCircle },
    { name: 'History', path: '/history', icon: History },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200">
        <div className="p-6 flex items-center gap-2 text-green-600 font-bold text-xl">
          <Leaf className="w-6 h-6" />
          <span>EcoTrack</span>
        </div>
        <nav className="px-4 pb-4 md:pb-0 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
