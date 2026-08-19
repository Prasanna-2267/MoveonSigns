import React, { useState } from 'react';
import { Menu, Search, Bell, ExternalLink } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { useLocation, Link } from 'react-router-dom';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Generate readable breadcrumb
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const pageTitle =
    pathSegments.length > 1
      ? pathSegments[pathSegments.length - 1].replace(/-/g, ' ').toUpperCase()
      : 'DASHBOARD';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      {/* Grouped Admin Sidebar */}
      <AdminSidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Admin Navigation Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-md"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-slate-400">ADMIN</span>
              <span className="text-slate-300">/</span>
              <span className="font-bold text-slate-900 uppercase tracking-wider">
                {pageTitle}
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search orders, products, customers..."
                className="bg-transparent text-xs text-slate-800 outline-none w-48 lg:w-64 placeholder:text-slate-400"
              />
            </div>

            <Link
              to="/"
              target="_blank"
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-400 text-xs font-semibold text-slate-700 transition-colors rounded-md shadow-xs"
            >
              <span>Live Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C71910] rounded-full" />
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-[1600px] mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
