'use client'

import { useState } from 'react'
import { coverUrl, type Book } from '@/lib/books'
import { cn } from '@/lib/utils'

type BookCoverProps = {
  book: Book
  className?: string
  priority?: boolean
}

export function BookCover({ book, className, priority }: BookCoverProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={cn(
        'relative aspect-[2/3] overflow-hidden rounded-md bg-coffee shadow-[0_6px_16px_-6px_rgba(94,48,35,0.55)]',
        className,
      )}
    >
      {failed ? (
        <div className="flex h-full flex-col justify-between bg-gradient-to-br from-coffee to-brownie p-3 text-cream">
          <span className="font-serif text-sm leading-tight font-semibold text-balance">{book.title}</span>
          <span className="text-[10px] tracking-wide uppercase opacity-80">{book.author}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coverUrl(book.isbn) || '/placeholder.svg'}
          alt={`Cover of ${book.title} by ${book.author}`}
          className="h-full w-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
          crossOrigin="anonymous"
          ref={(img) => {
            // Catches images that errored before hydration attached onError
            if (img?.complete && img.naturalWidth === 0) setFailed(true)
          }}
          onError={() => setFailed(true)}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-brownie/40 to-transparent"
      />
    </div>
  )
}
