import React from "react";

interface Mark {
  cfi: string;
  name: string;
}

interface MarksSidebarProps {
  open: boolean;
  marks: Mark[];
  newMarkName: string;
  onClose: () => void;
  onAddMark: () => void;
  onGoToMark: (cfi: string) => void;
  onDeleteMark: (idx: number) => void;
  onNewMarkNameChange: (name: string) => void;
}

const MarksSidebar: React.FC<MarksSidebarProps> = ({
  open,
  marks,
  newMarkName,
  onClose,
  onAddMark,
  onGoToMark,
  onDeleteMark,
  onNewMarkNameChange,
}) => {
  if (!open) return null;
  return (
    <div className="fixed sm:absolute left-0 top-0 z-30 h-full w-full sm:w-64 bg-white text-black shadow-xl overflow-y-auto transition-all duration-300">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold text-lg">Marcas</h2>
        <button onClick={onClose} className="text-xl">×</button>
      </div>
      <form
        className="flex flex-col sm:flex-row gap-2 p-4 border-b"
        onSubmit={e => { e.preventDefault(); onAddMark(); }}
      >
        <input
          type="text"
          placeholder="Nombre de la marca"
          value={newMarkName}
          onChange={e => onNewMarkNameChange(e.target.value)}
          className="flex-1 border rounded px-2 py-1 min-w-0"
        />
        <button type="submit" className="px-4 py-1 bg-primary text-primary-light rounded">Agregar</button>
      </form>
      <ul>
        {marks.map((mark, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => onGoToMark(mark.cfi)}
            title={mark.cfi}
          >
            <span className="hover:underline">
              {mark.name}
            </span>
            <button
              onClick={e => { e.stopPropagation(); onDeleteMark(idx); }}
              className="text-red-500 ml-2"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarksSidebar;
