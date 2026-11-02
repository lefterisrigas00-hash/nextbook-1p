import { NextBookApp } from '@/components/nextbook/nextbook-app'

export default function Page() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-brownie sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(192,136,82,0.35),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(137,87,55,0.5),transparent_50%)]"
      />
      <div className="relative flex items-center gap-16">
        <div className="hidden max-w-sm flex-col gap-4 text-cream lg:flex">
          <p className="text-xs font-semibold tracking-[0.3em] text-caramel uppercase">App Preview</p>
          <h1 className="font-serif text-6xl leading-none font-bold text-balance">
            Next<span className="text-caramel">Book</span>
          </h1>
          <p className="text-lg leading-relaxed text-cream/80">
            Netflix-style discovery for readers. Personalized picks, cozy tracking, and the fastest way to find
            your next book — in a store, a library, or on your e-reader.
          </p>
        </div>

        <div className="relative h-dvh w-full overflow-hidden sm:h-[844px] sm:w-[400px] sm:rounded-[3.25rem] sm:border-[11px] sm:border-[#2b1510] sm:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6),0_0_0_2px_#895737]">
          <NextBookApp />
        </div>
      </div>
    </div>
  )
}
