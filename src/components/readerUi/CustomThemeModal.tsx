import React from "react";

interface CustomThemeModalProps {
  open: boolean;
  onClose: () => void;
  customBgColor: string;
  customTextColor: string;
  onBgColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
  onApply: () => void;
}

const CustomThemeModal: React.FC<CustomThemeModalProps> = ({
  open,
  onClose,
  customBgColor,
  customTextColor,
  onBgColorChange,
  onTextColorChange,
  onApply,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">×</button>
        <h2 className="text-lg font-bold mb-4">Tema personalizado</h2>
        <div className="mb-4">
          <label className="block mb-1">Color de fondo</label>
          <input
            type="color"
            value={customBgColor}
            onChange={e => onBgColorChange(e.target.value)}
            className="w-12 h-12 p-0 border-none bg-transparent"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Color de texto</label>
          <input
            type="color"
            value={customTextColor}
            onChange={e => onTextColorChange(e.target.value)}
            className="w-12 h-12 p-0 border-none bg-transparent"
          />
        </div>
        <button
          onClick={onApply}
          className="px-4 py-2 bg-primary text-primary-light rounded w-full mt-2"
        >
          Aplicar tema
        </button>
      </div>
    </div>
  );
};

export default CustomThemeModal;
