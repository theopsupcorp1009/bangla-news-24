const Loading = () => {
  return (
    <main className="min-h-[75vh] bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header skeleton */}
        <div className="mb-6">
          <div className="h-7 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="mt-2 h-0.5 w-full bg-gray-100" />
        </div>

        {/* News cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-56 bg-gray-200 rounded-sm animate-pulse" />

              {/* Text */}
              <div className="pt-3">
                <div className="h-5 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-5 bg-gray-200 rounded w-4/5 mt-2 animate-pulse" />

                <div className="h-3 bg-gray-100 rounded w-2/5 mt-4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center mt-10">
          <div className="w-6 h-6 border-2 border-gray-200 border-t-[#b80000] rounded-full animate-spin" />
        </div>

      </div>
    </main>
  );
};

export default Loading;