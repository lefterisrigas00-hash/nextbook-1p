'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

type StarRatingProps = {
  value: number
  onChange?: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = { sm: 'size-3.5', md: 'size-5', lg: 'size-7' }

export function StarRating({ value, onChange, size = 'sm', className }: StarRatingProps) {
  const interactive = Boolean(onChange)

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={interactive ? 'Your rating' : `Rated ${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = value >= star - 0.25
        const half = !filled && value >= star - 0.75
        const icon = (
          <span className="relative inline-flex">
            <Star className={cn(sizes[size], 'text-caramel/35')} fill="currentColor" strokeWidth={0} />
            {(filled || half) && (
              <span className={cn('absolute inset-0 overflow-hidden', half && 'w-1/2')}>
                <Star className={cn(sizes[size], 'text-caramel')} fill="currentColor" strokeWidth={0} />
              </span>
            )}
          </span>
        )

        if (!interactive) return <span key={star}>{icon}</span>

        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={Math.round(value) === star}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            onClick={() => onChange?.(star)}
            className="rounded-sm p-0.5 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-caramel focus-visible:outline-none active:scale-95"
          >
            {icon}
          </button>
        )
      })}
    </div>
  )
}
