import Link from "next/link";

const NotFound = () => {
  return (
    <main className="min-h-[75vh] bg-[#fcfcfc] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl text-center">
        {/* 404 */}
        <div className="mb-6">
          <h1 className="text-8xl sm:text-9xl font-bold tracking-tight text-[#b80000]">
            404
          </h1>
        </div>

        {/* Divider */}
        <div className="w-16 h-1 bg-[#b80000] mx-auto mb-6" />

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="text-gray-600 text-sm sm:text-base leading-7 max-w-md mx-auto mb-8">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে, পরিবর্তন করা
          হয়েছে অথবা ঠিকানাটি ভুল হয়েছে।
        </p>

        {/* Actions */}
        <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-[#b80000] text-white text-sm font-medium hover:bg-[#960000] transition-colors duration-200"
          >
            হোম পেজে ফিরে যান
          </Link>
       
      </div>
    </main>
  );
};

export default NotFound;