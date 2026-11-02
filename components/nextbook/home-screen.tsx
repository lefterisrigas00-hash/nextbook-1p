'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Bell, MapPin, Search, Sparkles, X } from 'lucide-react'
import { allBooks, coverUrl, featuredBook, homeRows, type Book } from '@/lib/books'
import { cn } from '@/lib/utils'
import { BookCover } from './book-cover'
import { BookRow } from './book-row'
import { StarRating } from './star-rating'

const notifications = [
  { id: 1, text: 'Circe is now available at Public Syntagma', time: '2h ago' },
  { id: 2, text: 'You are 3 books away from your yearly goal', time: '1d ago' },
  { id: 3, text: 'New picks inspired by The Hobbit', time: '2d ago' },
]

type HomeScreenProps = {
  onSelect: (book: Book) => void
  onGetBook: (book: Book) => void
  onOpenProfile: () => void
}

export function HomeScreen({ onSelect, onGetBook, onOpenProfile }: HomeScreenProps) {
  const [query, setQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [unread, setUnread] = useState(true)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genres.some((g) => g.toLowerCase().includes(q)),
    )
  }, [query])

  return (
    <div className="flex flex-col gap-6 pb-6">
      <header className="flex flex-col gap-4 px-5 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-coffee">Good evening,</p>
            <h1 className="font-serif text-2xl font-bold text-brownie">Eleni</h1>
          </div>
          <div className="relative flex items-center gap-2">
            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={showNotifications}
              onClick={() => {
                setShowNotifications((v) => !v)
                setUnread(false)
              }}
              className="relative flex size-10 items-center justify-center rounded-full bg-coffee/10 text-brownie transition-colors hover:bg-coffee/20 focus-visible:ring-2 focus-visible:ring-caramel focus-visible:outline-none"
            >
              <Bell className="size-5" />
              {unread && <span className="absolute top-2 right-2.5 size-2 rounded-full bg-caramel ring-2 ring-cream" />}
            </button>
            <button
              type="button"
              aria-label="Open profile"
              onClick={onOpenProfile}
              className="relative size-10 overflow-hidden rounded-full ring-2 ring-caramel focus-visible:ring-4 focus-visible:outline-none"
            >
              <Image src="/images/avatar.png" alt="" fill sizes="40px" className="object-cover" />
            </button>

            {showNotifications && (
              <div className="animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 absolute top-12 right-0 z-20 w-64 rounded-2xl border border-coffee/15 bg-cream p-2 shadow-xl shadow-brownie/15">
                <p className="px-2 py-1.5 text-xs font-semibold tracking-wide text-coffee uppercase">Notifications</p>
                <ul>
                  {notifications.map((n) => (
                    <li key={n.id} className="rounded-xl px-2 py-2 hover:bg-coffee/10">
                      <p className="text-xs leading-snug font-medium text-brownie">{n.text}</p>
                      <p className="text-[10px] text-coffee">{n.time}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <label className="flex h-11 items-center gap-2 rounded-full border border-coffee/20 bg-coffee/[0.07] px-4 focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/30">
          <Search className="size-4 shrink-0 text-coffee" aria-hidden="true" />
          <span className="sr-only">Search books</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, authors, genres..."
            className="h-full w-full bg-transparent text-sm text-brownie outline-none placeholder:text-coffee/60 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="text-coffee">
              <X className="size-4" />
            </button>
          )}
        </label>
      </header>

      {query ? (
        <section aria-label="Search results" className="px-5">
          <p className="mb-3 text-sm text-coffee">
            {results.length} {results.length === 1 ? 'result' : 'results'} for{' '}
            <span className="font-semibold text-brownie">{`"${query}"`}</span>
          </p>
          {results.length > 0 ? (
            <ul className="grid grid-cols-3 gap-3">
              {results.map((book) => (
                <li key={book.id}>
                  <button type="button" onClick={() => onSelect(book)} className="flex w-full flex-col gap-1.5 text-left">
                    <BookCover book={book} className="w-full" />
                    <span className="truncate text-xs font-semibold text-brownie">{book.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl bg-coffee/10 p-6 text-center text-sm text-coffee">
              No books found. Try another title or genre.
            </p>
          )}
        </section>
      ) : (
        <>
          <HeroCard book={featuredBook} onSelect={onSelect} onGetBook={onGetBook} />
          {homeRows.map((row) => (
            <BookRow
              key={row.id}
              title={row.title}
              books={row.books}
              onSelect={onSelect}
              ranked={row.ranked}
              showFormat={row.id === 'audio-ebooks'}
            />
          ))}
        </>
      )}
    </div>
  )
}

function HeroCard({
  book,
  onSelect,
  onGetBook,
}: {
  book: Book
  onSelect: (book: Book) => void
  onGetBook: (book: Book) => void
}) {
  return (
    <section aria-labelledby="hero-title" className="px-5">
      <div className="relative overflow-hidden rounded-3xl bg-brownie p-5 text-cream shadow-xl shadow-brownie/30">
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-125 bg-cover bg-center opacity-35 blur-2xl"
          style={{ backgroundImage: `url(${coverUrl(book.isbn)})` }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brownie via-brownie/70 to-transparent" />

        <div className="relative flex flex-col gap-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-caramel uppercase">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Book Recommendation of the Day
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => onSelect(book)}
              aria-label={`View details for ${book.title}`}
              className="shrink-0 transition-transform hover:scale-[1.03] active:scale-95"
            >
              <BookCover book={book} priority className="w-28 rotate-[-3deg] shadow-2xl shadow-black/40" />
            </button>
            <div className="flex min-w-0 flex-col justify-center gap-2">
              <span className="w-fit rounded-full bg-caramel px-2.5 py-1 text-[11px] font-bold text-cream">
                {book.match}% Match for You
              </span>
              <h2 id="hero-title" className="font-serif text-3xl leading-tight font-bold text-balance">
                {book.title}
              </h2>
              <p className="text-sm text-cream/80">by {book.author}</p>
              <div className="flex items-center gap-1.5">
                <StarRating value={book.rating} />
                <span className="text-xs text-cream/80">{book.rating}</span>
              </div>
            </div>
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-cream/80">{book.description}</p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onGetBook(book)}
              className={cn(
                'flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-caramel text-sm font-semibold text-cream',
                'transition-all hover:brightness-110 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cream focus-visible:outline-none',
              )}
            >
              <MapPin className="size-4" aria-hidden="true" />
              Where to Find / Buy
            </button>
            <button
              type="button"
              onClick={() => onSelect(book)}
              className="h-11 rounded-full border border-cream/30 px-4 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
