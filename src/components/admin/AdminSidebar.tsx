import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  Users,
  Tag,
  BarChart3,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  LogOut,
  X,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface SubMenuItem {
  label: string;
  path: string;
}

interface NavGroup {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  submenu?: SubMenuItem[];
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isMobileOpen,
  onMobileClose,
  isCollapsed,
  onToggleCollapse
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation Items (Content group removed per user request)
  const NAV_ITEMS: NavGroup[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin'
    },
    {
      id: 'store',
      label: 'Store',
      icon: Store,
      submenu: [
        { label: 'Products', path: '/admin/products' },
        { label: 'Inventory', path: '/admin/inventory' },
        { label: 'Shipping', path: '/admin/shipping' }
      ]
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      path: '/admin/orders'
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      path: '/admin/customers'
    },
    {
      id: 'marketing',
      label: 'Marketing',
      icon: Tag,
      submenu: [
        { label: 'Discounts', path: '/admin/discounts' },
        { label: 'Abandoned Carts', path: '/admin/abandoned-carts' }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      submenu: [
        { label: 'Overview', path: '/admin/analytics' },
        { label: 'Search Analytics', path: '/admin/analytics/search' }
      ]
    }
  ];

  const isGroupActive = (item: NavGroup) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    if (item.submenu) {
      return item.submenu.some((sub) => location.pathname.startsWith(sub.path));
    }
    return false;
  };

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    store: true,
    marketing: false,
    analytics: false
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    if (isMobileOpen) {
      onMobileClose();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-slate-800 border-r border-slate-200 select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between bg-white">
        {!isCollapsed ? (
          <div>
            <div className="font-jost text-sm font-bold tracking-[0.14em] text-slate-900 uppercase leading-none">
              MOVE ON SIGNS
            </div>
            <div className="text-[10px] font-mono tracking-widest text-[#C71910] font-bold mt-1">
              ADMIN PORTAL
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded bg-[#1E3A2B] text-white flex items-center justify-center font-bold text-xs">
            MOS
          </div>
        )}

        <div className="flex items-center space-x-1">
          {/* Collapse Toggle for Desktop */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>

          {/* Close for Mobile */}
          <button
            onClick={onMobileClose}
            className="md:hidden p-1.5 hover:bg-slate-100 text-slate-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grouped Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isGroupActive(item);
          const hasSubmenu = Boolean(item.submenu && item.submenu.length > 0);
          const isExpanded = expandedGroups[item.id] || active;

          // Single item without submenu
          if (!hasSubmenu && item.path) {
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path!)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center px-0' : 'justify-between px-3.5'
                } py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                  active
                    ? 'bg-[#1E3A2B] text-white shadow-xs font-bold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
              </button>
            );
          }

          // Item with submenu
          return (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => {
                  if (isCollapsed) {
                    onToggleCollapse();
                  }
                  toggleGroup(item.id);
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center px-0' : 'justify-between px-3.5'
                } py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                  active && !isExpanded
                    ? 'bg-slate-100 text-slate-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>

                {!isCollapsed && (
                  <div>
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    )}
                  </div>
                )}
              </button>

              {/* Submenu links */}
              {!isCollapsed && isExpanded && item.submenu && (
                <div className="pl-6 pr-1 py-1 space-y-0.5 border-l border-slate-200 ml-5 my-0.5">
                  {item.submenu.map((sub) => {
                    const isSubActive =
                      location.pathname === sub.path ||
                      (sub.path === '/admin/products' &&
                        location.pathname.startsWith('/admin/products/edit'));

                    return (
                      <button
                        key={sub.path}
                        onClick={() => handleNavClick(sub.path)}
                        className={`w-full text-left px-3 py-2 rounded-md text-xs font-sans transition-all flex items-center justify-between ${
                          isSubActive
                            ? 'bg-[#1E3A2B] text-white font-semibold shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Profile & Quick Links */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between px-3'
          } py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-md transition-colors`}
          title="View Live Store"
        >
          <div className="flex items-center space-x-2">
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            {!isCollapsed && <span>View Storefront</span>}
          </div>
        </a>

        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between px-2'
          } pt-1`}
        >
          {!isCollapsed && (
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                A
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">Administrator</p>
                <p className="text-[10px] text-slate-500 truncate">admin@moveonsigns.com</p>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/')}
            className="p-1.5 text-slate-500 hover:text-[#C71910] hover:bg-slate-200/60 rounded transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block h-screen sticky top-0 transition-all duration-300 z-40 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
