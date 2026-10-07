import Image from "next/image";
import Link from "next/link";
import Navlinks from "./Navlinks";
import MobileNav from "./MobileNav";
import UserInfo from "./UserInfo";

const Header = async () => {
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const res = await fetch(
    "https://news-api-v2.vercel.app/api/categories",
    {
      cache: "no-store",
    }
  );

  const data: CategoriesResponse = await res.json();

  const navItems: Category[] = data.data.filter(
    (item: Category) => item.scrapable
  );

  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative flex items-center justify-between py-3 sm:py-4 md:grid md:grid-cols-3 md:py-5">
          <div className="md:hidden">
            <MobileNav navItems={navItems} />
          </div>

          <div className="hidden md:block" />

          <Link
            href="/"
            className="
              absolute left-1/2 -translate-x-1/2
              flex items-center gap-2
              md:static md:translate-x-0
              md:flex-col md:gap-1
              lg:gap-2
            "
          >
            <div
              className="
                relative w-9 h-9
                sm:w-10 sm:h-10
                rounded-lg overflow-hidden
              "
            >
              <Image
                src="/logo.webp"
                alt="Bangla News 24 Logo"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>

            <span
              className="
                text-lg sm:text-xl
                md:text-2xl lg:text-3xl
                font-bold
                text-[#b80000]
                tracking-tight
                whitespace-nowrap
              "
            >
              Bangla News 24
            </span>

            <p className="hidden md:block text-xs lg:text-sm text-gray-500">
              {formattedDate}
            </p>
          </Link>

          <UserInfo />
        </div>

        <p
          className="
            md:hidden
            text-center
            text-xs sm:text-sm
            text-gray-500
            pb-3
          "
        >
          {formattedDate}
        </p>

        <div className="hidden md:block">
          <Navlinks/>
        </div>
      </div>
    </header>
  );
};

export default Header;