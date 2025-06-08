import React from 'react';

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
  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl relative">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-400">Compliance</h2>
        <h3 className="text-sm text-gray-400 mb-8">Dashboard</h3>
      </div>
      <nav className="px-4 space-y-1">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => onSelect(link.path)}
            className={`w-full text-left flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              activePath === link.path
                ? 'bg-black/60 text-white shadow-lg scale-[1.02]'
                : 'text-gray-300 hover:bg-black/40 hover:text-white'
            }`}
          >
            <span className="font-medium">{link.label}</span>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-4 text-sm text-gray-400">
        © 2025 Compliance
      </div>
    </div>
  );
};

export default Sidebar;
