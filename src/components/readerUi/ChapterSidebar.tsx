import React from "react";

interface TocItem {
  href: string;
  label: string;
  subitems?: TocItem[];
}

interface ChapterSidebarProps {
  toc: TocItem[];
  open: boolean;
  onClose: () => void;
  onGoTo: (href: string) => void;
}

const ChapterSidebar: React.FC<ChapterSidebarProps> = ({ toc, open, onClose, onGoTo }) => {
  if (!open) return null;
  return (
    <div className="absolute left-0 top-0 z-30 h-full w-64 bg-white text-black shadow-xl overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-bold text-lg">Capítulos</h2>
        <button onClick={onClose} className="text-xl">×</button>
      </div>
      <ul>
        {toc.map((item, idx) => (
          <li
            key={idx}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => onGoTo(item.href)}
            title={item.href}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterSidebar;
