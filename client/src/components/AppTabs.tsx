import { Link, useLocation } from "wouter";

export default function AppTabs() {
  const [location] = useLocation();
  
  return (
    <div className="mb-8 border-b border-[#4c6767]">
      <div className="flex space-x-2">
        <Link
          href="/"
          className={`px-4 py-3 border-b-2 ${
            location === '/'
              ? 'border-[#93ec93] text-[#f5f5f5] font-semibold'
              : 'border-transparent text-[#bfbfbf] hover:text-[#f5f5f5] transition-colors'
          }`}
        >
          Tip Distribution
        </Link>
        <Link
          href="/partners"
          className={`px-4 py-3 border-b-2 ${
            location === '/partners'
              ? 'border-[#93ec93] text-[#f5f5f5] font-semibold'
              : 'border-transparent text-[#bfbfbf] hover:text-[#f5f5f5] transition-colors'
          }`}
        >
          Partners
        </Link>
      </div>
    </div>
  );
}
