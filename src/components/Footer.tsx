const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 mt-8 text-xs text-gray-500 px-3 md:px-0 lg:px-0">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div>
          © {new Date().getFullYear()} BanglaBulletin
        </div>
        <div>
          Source: BBC Bangla
        </div>
      </div>
    </footer>
  );
};

export default Footer;