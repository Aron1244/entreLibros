interface EmptyStateProps {
  message: string;
  onReset: () => void;
}

export default function EmptyState({ message, onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <svg
          className="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No se encontraron libros
        </h3>
        <p className="mt-1 text-sm text-gray-500">{message}</p>
        <div className="mt-6">
          <button
            onClick={onReset}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Mostrar todos los libros
          </button>
        </div>
      </div>
    </div>
  );
}
