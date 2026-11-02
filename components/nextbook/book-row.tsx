'use client'

import { Headphones, Tablet } from 'lucide-react'
import type { Book } from '@/lib/books'
import { BookCover } from './book-cover'

type BookRowProps = {
  title: string
  books: Book[]
  onSelect: (book: Book) => void
  ranked?: boolean
  showFormat?: boolean
}

export function BookRow({ title, books, onSelect, ranked, showFormat }: BookRowProps) {
  return (
    <section aria-label={title} className="flex flex-col gap-3">
      <h2 className="px-5 font-serif text-lg font-semibold text-brownie">{title}</h2>
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-5 pb-2">
        {books.map((book, index) => (
          <li key={book.id} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => onSelect(book)}
              className="group relative flex w-28 flex-col gap-2 text-left focus-visible:outline-none"
            >
              <div className="relative">
                {ranked && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 -left-1 z-10 font-serif text-5xl leading-none font-black text-caramel [text-shadow:0_2px_0_#5E3023]"
                  >
                    {index + 1}
                  </span>
                )}
                <BookCover
                  book={book}
                  className="w-28 transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-caramel group-active:scale-95"
                />
                {showFormat && (
                  <span className="absolute top-1.5 right-1.5 flex items-center gap-1 rounded-full bg-brownie/90 px-1.5 py-0.5 text-[9px] font-semibold text-cream">
                    {book.format === 'Audiobook' ? (
                      <Headphones className="size-2.5" aria-hidden="true" />
                    ) : (
                      <Tablet className="size-2.5" aria-hidden="true" />
                    )}
                    {book.format}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-brownie">{book.title}</p>
                <p className="truncate text-[11px] text-coffee">{book.author}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
