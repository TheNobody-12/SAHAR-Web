export default function RangoliDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-8 ${className}`} aria-hidden>
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-rose-400">
        <path d="M16 0L18.5 13.5L32 16L18.5 18.5L16 32L13.5 18.5L0 16L13.5 13.5L16 0Z" fill="currentColor" opacity="0.6" />
        <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.4" />
      </svg>
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
    </div>
  );
}
