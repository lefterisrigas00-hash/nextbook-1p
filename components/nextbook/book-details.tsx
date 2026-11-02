'use client'

import { ArrowLeft, BookOpen, Calendar, Heart, ShoppingBag, Sparkles } from 'lucide-react'
import { coverUrl, similarBooks, type Book } from '@/lib/books'
import { cn } from '@/lib/utils'
import { BookCover } from './book-cover'
import { BookRow } from './book-row'
import { StarRating } from './star-rating'

type BookDetailsProps = {
  book: Book
  saved: boolean
  onToggleSave: () => void
  onBack: () => void
  onSelect: (book: Book) => void
  onGetBook: () => void
}

export function BookDetails({ book, saved, onToggleSave, onBack, onSelect, onGetBook }: BookDetailsProps) {
  const year = book.year < 0 ? `${Math.abs(book.year)} BC` : String(book.year)

  return (
    <div className="animate-in slide-in-from-right-full absolute inset-0 z-30 flex flex-col bg-cream duration-300">
      <div className="no-scrollbar flex-1 overflow-y-auto">
        <div className="relative px-5 pt-14 pb-8">
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-125 bg-cover bg-center opacity-40 blur-3xl"
            style={{ backgroundImage: `url(${coverUrl(book.isbn)})` }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/40 to-cream" />

          <div className="absolute top-3 right-5 left-5 z-10 flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="flex size-10 items-center justify-center rounded-full bg-cream/80 text-brownie shadow-sm backdrop-blur transition-transform active:scale-90"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={onToggleSave}
              aria-pressed={saved}
              aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
              className="flex size-10 items-center justify-center rounded-full bg-cream/80 text-brownie shadow-sm backdrop-blur transition-transform active:scale-90"
            >
              <Heart className={cn('size-5 transition-colors', saved && 'fill-caramel text-caramel')} />
            </button>
          </div>

          <div className="relative flex flex-col items-center gap-4 text-center">
            <BookCover book={book} priority className="w-44 rounded-lg shadow-2xl shadow-brownie/40" />
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-serif text-3xl leading-tight font-bold text-balance text-brownie">{book.title}</h1>
              <p className="text-sm font-medium text-coffee">by {book.author}</p>
            </div>
            <div className="flex items-center gap-2">
              <StarRating value={book.rating} size="md" />
              <span className="text-sm font-semibold text-brownie">{book.rating.toFixed(1)}</span>
            </div>
            <ul className="flex flex-wrap justify-center gap-2" aria-label="Genres">
              {book.genres.map((genre) => (
                <li
                  key={genre}
                  className="rounded-full border border-coffee/25 bg-cream/70 px-3 py-1 text-xs font-medium text-coffee"
                >
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 px-5">
          <dl className="grid grid-cols-3 divide-x divide-coffee/15 rounded-2xl bg-coffee/[0.08] py-3 text-center">
            <div className="flex flex-col items-center gap-0.5">
              <dt className="flex items-center gap-1 text-[10px] tracking-wide text-coffee uppercase">
                <BookOpen className="size-3" aria-hidden="true" /> Pages
              </dt>
              <dd className="text-sm font-bold text-brownie">{book.pages}</dd>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <dt className="flex items-center gap-1 text-[10px] tracking-wide text-coffee uppercase">
                <Calendar className="size-3" aria-hidden="true" /> Year
              </dt>
              <dd className="text-sm font-bold text-brownie">{year}</dd>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <dt className="text-[10px] tracking-wide text-coffee uppercase">Format</dt>
              <dd className="text-sm font-bold text-brownie">{book.format}</dd>
            </div>
          </dl>

          <section aria-labelledby="why-title" className="relative overflow-hidden rounded-2xl bg-brownie p-4 text-cream">
            <div aria-hidden="true" className="absolute -top-8 -right-8 size-28 rounded-full bg-caramel/30 blur-2xl" />
            <div className="relative flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 id="why-title" className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="size-4 text-caramel" aria-hidden="true" />
                  Why we recommended this for you
                </h2>
                <span className="rounded-full bg-caramel px-2 py-0.5 text-[10px] font-bold">{book.match}% Match</span>
              </div>
              <p className="text-xs leading-relaxed text-cream/85">{book.reason}</p>
            </div>
          </section>

          <section aria-labelledby="about-title" className="flex flex-col gap-2">
            <h2 id="about-title" className="font-serif text-lg font-semibold text-brownie">
              About this book
            </h2>
            <p className="text-sm leading-relaxed text-coffee">{book.description}</p>
          </section>
        </div>

        <div className="pt-6 pb-32">
          <BookRow title="You Might Also Like" books={similarBooks(book)} onSelect={onSelect} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cream via-cream to-transparent px-5 pt-6 pb-8">
        <button
          type="button"
          onClick={onGetBook}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-caramel text-base font-semibold text-cream shadow-lg shadow-caramel/40 transition-all hover:brightness-110 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brownie focus-visible:outline-none"
        >
          <ShoppingBag className="size-5" aria-hidden="true" />
          Get This Book
        </button>
      </div>
    </div>
  )
}
