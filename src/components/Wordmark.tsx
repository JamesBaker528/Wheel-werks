/**
 * Typographic wordmark. The supplied raster logo (public/media/logo.png) is 356px wide
 * and built for light backgrounds — replace with an owner-supplied vector logo when available.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
        <defs>
          <linearGradient id="wm-chrome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset=".5" stopColor="#c9ced4" />
            <stop offset="1" stopColor="#6b737b" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="none" stroke="url(#wm-chrome)" strokeWidth="3" />
        <circle cx="20" cy="20" r="4.5" fill="#e11d2a" />
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} d="M20 15.5 L17.6 4.5 L22.4 4.5 Z" fill="url(#wm-chrome)" transform={`rotate(${r} 20 20)`} />
        ))}
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[1.35rem] font-bold uppercase tracking-[0.06em] chrome-text">Wheel Werks</span>
        <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.42em] text-mute">Inc. · Since 1986</span>
      </span>
    </span>
  );
}
