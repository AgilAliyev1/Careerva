import { cn } from "@/lib/utils";

interface CareervaLogoProps {
  className?: string;
  iconClassName?: string;
  showText?: boolean;
}

export const CareervaLogo = ({
  className,
  iconClassName,
  showText = true,
}: CareervaLogoProps) => {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        className={cn("h-8 w-8", iconClassName)}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden={!showText}
      >
        <defs>
          <linearGradient id="hatGradient" x1="10" y1="8" x2="54" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1D4ED8" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="tasselGradient" x1="46" y1="32" x2="58" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2563EB" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <path d="M32 8L6 20L32 32L58 20L32 8Z" fill="url(#hatGradient)" />
        <path d="M46 27L46 37C46 41 40 44 32 44C24 44 18 41 18 37V27L32 34L46 27Z" fill="#1E3A8A" opacity="0.85" />
        <path d="M32 36L18 29V37C18 41 24 44 32 44C40 44 46 41 46 37V29L32 36Z" fill="url(#hatGradient)" />
        <path d="M46 23V28C48 29 50 30 52 31C53 31.5 53 33 52 33.5L48 35" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
        <path d="M52 31.5L52 47" stroke="url(#tasselGradient)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="52" cy="48" r="5" fill="url(#tasselGradient)" />
        <path
          d="M26 26L34 14L38 18L46 18L38 32"
          stroke="#F8FAFC"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText && (
        <span className="text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
            Careerva
          </span>
        </span>
      )}
    </span>
  );
};
