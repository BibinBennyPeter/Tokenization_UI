import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type LinkItem = {
  path: string;
  label: string;
};

type SidebarProps = {
  links: LinkItem[];
  activePath: string;
  onSelect: (path: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ links, activePath, onSelect }) => {
  const [open, setOpen] = useState(false);

  // Sidebar content as a function for reuse
  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">Compliance</h1>
        <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-8 drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">Dashboard</h3>
      </div>
      <nav className="px-4 space-y-1 flex-1">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => {
              onSelect(link.path);
              setOpen(false); // close sidebar on mobile after selection
            }}
            className={`w-full text-left flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              activePath === link.path
                ? 'text-blue-600 dark:text-[#AE5968] font-medium drop-shadow-[0_0_8px_rgba(37,99,235,0.2)] dark:drop-shadow-[0_0_8px_rgba(174,89,104,0.3)]'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-[#AE5968] hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(174,89,104,0.3)]'
            }`}
          >
            <span>{link.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-[#444857]">
        © 2025 Compliance
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-[#303540] border border-gray-200 dark:border-[#444857] rounded-lg p-2 shadow-sm"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-gray-900 dark:text-gray-100" />
      </button>

      {/* Sidebar for desktop */}
      <div className="hidden md:block w-72 min-h-screen bg-white dark:bg-[#303540] border-r border-gray-200 dark:border-[#444857] text-gray-900 dark:text-gray-100 shadow-sm relative">
        {sidebarContent}
      </div>

      {/* Sidebar overlay for mobile */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar overlay"
          />
          {/* Sidebar panel */}
          <div className="relative w-64 bg-white dark:bg-[#303540] border-r border-gray-200 dark:border-[#444857] shadow-lg min-h-screen z-50 animate-slide-in-left">
            <button
              className="absolute top-4 right-4 text-gray-900 dark:text-gray-100 bg-white dark:bg-[#303540] border border-gray-200 dark:border-[#444857] rounded-lg p-1 z-50"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

// Add this to your global CSS or Tailwind config for the animation:
// @layer utilities {
//   .animate-slide-in-left {
//     animation: slide-in-left 0.2s cubic-bezier(0.4,0,0.2,1);
//   }
//   @keyframes slide-in-left {
//     from { transform: translateX(-100%); opacity: 0; }
//     to { transform: translateX(0); opacity: 1; }
//   }
// }
