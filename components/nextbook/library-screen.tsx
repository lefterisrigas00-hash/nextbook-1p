'use client'

import { useState } from 'react'
import { Heart, Minus, NotebookPen, Plus, Send } from 'lucide-react'
import { books, currentlyReading, recentlyRead, type Book } from '@/lib/books'
import { BookCover } from './book-cover'
import { BookRow } from './book-row'
import { StarRating } from './star-rating'

type Note = { id: number; page: number; text: string; date: string }

const initialNotes: Note[] = [
  { id: 1, page: 98, text: 'Habit stacking: after I pour my coffee, I will read 10 pages.', date: 'Feb 8' },
  { id: 2, page: 131, text: 'Make it obvious, attractive, easy, satisfying. The 4 laws!', date: 'Feb 10' },
]

type LibraryScreenProps = {
  wishlist: string[]
  onSelect: (book: Book) => void
  onToggleSave: (id: string) => void
}

export function LibraryScreen({ wishlist, onSelect, onToggleSave }: LibraryScreenProps) {
  const { book } = currentlyReading
  const [page, setPage] = useState(currentlyReading.page)
  const [rating, setRating] = useState(4)
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [draft, setDraft] = useState('')

  const percent = Math.round((page / book.pages) * 100)
  const changePage = (delta: number) => setPage((p) => Math.min(book.pages, Math.max(0, p + delta)))

  const addNote = () => {
    const text = draft.trim()
    if (!text) return
    setNotes((n) => [{ id: Date.now(), page, text, date: 'Today' }, ...n])
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-7 px-0 pt-2 pb-6">
      <header className="px-5">
        <h1 className="font-serif text-3xl font-bold text-brownie">My Library</h1>
        <p className="text-sm text-coffee">Pick up right where you left off</p>
      </header>

      <section aria-labelledby="current-title" className="px-5">
        <div className="flex flex-col gap-4 rounded-3xl border border-coffee/15 bg-coffee/[0.07] p-4">
          <p className="text-[11px] font-semibold tracking-widest text-coffee uppercase">Currently Reading</p>
          <div className="flex gap-4">
            <button type="button" onClick={() => onSelect(book)} aria-label={`View ${book.title}`} className="shrink-0">
              <BookCover book={book} className="w-24" />
            </button>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h2 id="current-title" className="font-serif text-xl leading-tight font-bold text-brownie">
                {book.title}
              </h2>
              <p className="text-xs text-coffee">{book.author}</p>
              <div className="mt-auto flex flex-col gap-1">
                <StarRating value={rating} onChange={setRating} size="md" className="-ml-0.5" />
                <span className="text-[10px] text-coffee">Your rating so far</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-brownie">
                Page {page} <span className="font-normal text-coffee">of {book.pages}</span>
              </span>
              <span className="text-sm font-bold text-caramel">{percent}%</span>
            </div>
            <div
              role="progressbar"
              aria-label="Reading progress"
              aria-valuenow={page}
              aria-valuemin={0}
              aria-valuemax={book.pages}
              className="h-2.5 overflow-hidden rounded-full bg-coffee/15"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-coffee to-caramel transition-[width] duration-500 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="text-[11px] text-coffee">~{Math.ceil(((book.pages - page) * 1.5) / 60)}h left</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Back 10 pages"
                  onClick={() => changePage(-10)}
                  className="flex size-8 items-center justify-center rounded-full border border-coffee/25 text-coffee transition-colors hover:bg-coffee/10 active:scale-90"
                >
                  <Minus className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => changePage(10)}
                  className="flex h-8 items-center gap-1 rounded-full bg-caramel px-3 text-xs font-semibold text-cream transition-all hover:brightness-110 active:scale-95"
                >
                  <Plus className="size-3.5" aria-hidden="true" />
                  10 pages
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-coffee/15 pt-3">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-brownie">
              <NotebookPen className="size-4 text-coffee" aria-hidden="true" />
              Reading Notes
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                addNote()
              }}
              className="flex items-center gap-2 rounded-full border border-coffee/20 bg-cream py-1 pr-1 pl-4 focus-within:border-caramel"
            >
              <label htmlFor="note-input" className="sr-only">
                Add a note
              </label>
              <input
                id="note-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault()
                }}
                placeholder={`Note for page ${page}...`}
                className="h-8 flex-1 bg-transparent text-xs text-brownie outline-none placeholder:text-coffee/60"
              />
              <button
                type="submit"
                aria-label="Save note"
                disabled={!draft.trim()}
                className="flex size-8 items-center justify-center rounded-full bg-brownie text-cream transition-opacity disabled:opacity-40"
              >
                <Send className="size-3.5" />
              </button>
            </form>
            <ul className="flex flex-col gap-2">
              {notes.map((note) => (
                <li key={note.id} className="animate-in fade-in-0 slide-in-from-top-1 rounded-xl bg-cream px-3 py-2">
                  <div className="mb-0.5 flex items-center justify-between text-[10px] font-semibold text-caramel">
                    <span>Page {note.page}</span>
                    <span className="font-medium text-coffee">{note.date}</span>
                  </div>
                  <p className="text-xs leading-snug text-brownie">{note.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <BookRow title="Recently Read" books={recentlyRead} onSelect={onSelect} />

      <section aria-labelledby="wishlist-title" className="flex flex-col gap-3 px-5">
        <div className="flex items-baseline justify-between">
          <h2 id="wishlist-title" className="font-serif text-lg font-semibold text-brownie">
            Saved for Later
          </h2>
          <span className="text-xs text-coffee">{wishlist.length} books</span>
        </div>
        {wishlist.length === 0 ? (
          <p className="rounded-2xl bg-coffee/10 p-6 text-center text-sm text-coffee">
            Tap the heart on any book to save it here.
          </p>
        ) : (
          <ul className="grid grid-cols-3 gap-x-3 gap-y-4">
            {wishlist.map((id) => {
              const b = books[id]
              return (
                <li key={id} className="relative">
                  <button type="button" onClick={() => onSelect(b)} className="flex w-full flex-col gap-1.5 text-left">
                    <BookCover book={b} className="w-full" />
                    <span className="truncate text-[11px] font-semibold text-brownie">{b.title}</span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${b.title} from wishlist`}
                    onClick={() => onToggleSave(id)}
                    className="absolute top-1.5 right-1.5 flex size-7 items-center justify-center rounded-full bg-cream/90 shadow-sm transition-transform active:scale-90"
                  >
                    <Heart className="size-3.5 fill-caramel text-caramel" />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
