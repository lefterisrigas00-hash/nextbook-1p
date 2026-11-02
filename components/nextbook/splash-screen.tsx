import { cn } from '@/lib/utils'

export function SplashScreen({ leaving }: { leaving: boolean }) {
  return (
    <div
      role="status"
      aria-label="Loading NextBook"
      className={cn(
        'absolute inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-cream transition-opacity duration-700',
        leaving && 'pointer-events-none opacity-0',
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(192,136,82,0.28),transparent_60%)]"
      />

      <div className="relative" style={{ perspective: '900px' }} aria-hidden="true">
        <div className="relative h-32 w-48" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-y-0 left-0 w-1/2 rounded-l-lg bg-brownie p-1.5 pr-0">
            <div className="h-full rounded-l-md bg-cream" />
          </div>
          <div className="absolute inset-y-0 right-0 w-1/2 rounded-r-lg bg-brownie p-1.5 pl-0">
            <div className="h-full space-y-2 rounded-r-md bg-cream px-3 py-4">
              {[80, 95, 70, 88, 60].map((w, i) => (
                <div key={i} className="h-1 rounded-full bg-coffee/30" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="animate-page-flip absolute top-1.5 bottom-1.5 left-1/2 w-[calc(50%-6px)] origin-left rounded-r-md border-l border-coffee/20 bg-cream shadow-[2px_0_8px_rgba(94,48,35,0.18)]"
              style={{ animationDelay: `${i * 0.35}s`, transformStyle: 'preserve-3d', backfaceVisibility: 'visible' }}
            >
              <div className="space-y-2 px-3 py-4">
                {[85, 70, 92, 65].map((w, j) => (
                  <div key={j} className="h-1 rounded-full bg-caramel/35" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          ))}
          <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-coffee" />
        </div>
        <div className="mx-auto mt-3 h-3 w-40 rounded-[50%] bg-brownie/20 blur-md" />
      </div>

      <div className="animate-float-up relative flex flex-col items-center gap-2 text-center">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-brownie">
          Next<span className="text-caramel">Book</span>
        </h1>
        <p className="text-sm font-medium text-coffee">Your next favorite story awaits</p>
      </div>

      <div className="relative h-1 w-32 overflow-hidden rounded-full bg-coffee/15" aria-hidden="true">
        <div className="animate-loading-bar absolute inset-y-0 w-1/2 rounded-full bg-caramel" />
      </div>
    </div>
  )
}
