export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full animate-pulse-slow">
      {/* Image placeholder */}
      <div className="aspect-[3/4] w-full bg-gray-200"></div>

      {/* Content placeholder */}
      <div className="p-5 space-y-3">
        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>

        <div className="flex justify-between pt-2">
          <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
