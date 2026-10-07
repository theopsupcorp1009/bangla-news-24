import Link from "next/link";

const Navlinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app//api/categories");
  const data: CategoriesResponse = await res.json();
  const mainData: Category[] = data.data;
  const navItems: Category[] = mainData.filter(
    (item: Category) => item.scrapable,
  );

  return (
    <nav className="w-full border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
      <ul className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 text-sm font-medium text-gray-700">
        <li className="relative py-1.5 px-1 block text-gray-700 hover:text-[#b80000] transition-colors duration-200 group">
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#b80000] transition-all duration-200 group-hover:w-full" />
          <Link href="/">হোম</Link>
        </li>
        {navItems.map((item: Category, index: number) => (
          <li key={index}>
            <Link
              href={`/category/${item.slug}`}
              className="relative py-1.5 px-1 block text-gray-700 hover:text-[#b80000] transition-colors duration-200 group"
            >
              {item.title}
              {/* Subtle hover underline effect */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#b80000] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navlinks;
