'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Flame, MapPin, Minus, Plus, Settings } from 'lucide-react'
import { lastRead, type Book } from '@/lib/books'
import { cn } from '@/lib/utils'
import { BookCover } from './book-cover'
import { CircularProgress } from './circular-progress'
import { StarRating } from './star-rating'

const genreOptions = [
  'Sci-Fi',
  'Historical Fiction',
  'Self-Improvement',
  'Fantasy',
  'Mythology',
  'Mystery',
  'Memoir',
  'Classics',
  'Romance',
  'Psychology',
]

export function ProfileScreen({ onSelect }: { onSelect: (book: Book) => void }) {
  const [hours, setHours] = useState(2)
  const [booksRead, setBooksRead] = useState(12)
  const [genres, setGenres] = useState<string[]>(['Sci-Fi', 'Historical Fiction', 'Self-Improvement', 'Fantasy'])

  const toggleGenre = (g: string) =>
    setGenres((current) => (current.includes(g) ? current.filter((x) => x !== g) : [...current, g]))

  return (
    <div className="flex flex-col gap-7 pt-2 pb-6">
      <header className="flex flex-col items-center gap-3 px-5 text-center">
        <div className="flex w-full justify-end">
          <button
            type="button"
            aria-label="Settings"
            className="flex size-10 items-center justify-center rounded-full bg-coffee/10 text-brownie hover:bg-coffee/20"
          >
            <Settings className="size-5" />
          </button>
        </div>
        <div className="relative -mt-6 size-24 overflow-hidden rounded-full ring-4 ring-caramel ring-offset-4 ring-offset-cream">
          <Image src="/images/avatar.png" alt="Eleni Papadopoulou" fill sizes="96px" className="object-cover" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-2xl font-bold text-brownie">Eleni Papadopoulou</h1>
          <p className="flex items-center justify-center gap-1 text-xs text-coffee">
            <MapPin className="size-3" aria-hidden="true" /> Athens, Greece
          </p>
          <p className="mx-auto max-w-[260px] text-sm leading-relaxed text-coffee">
            Fantasy wanderer, mythology lover & morning-coffee reader.
          </p>
        </div>
        <dl className="grid w-full grid-cols-3 divide-x divide-coffee/15 rounded-2xl bg-coffee/[0.08] py-3">
          {[
            { label: 'Books', value: 48 },
            { label: 'Reviews', value: 23 },
            { label: 'Following', value: 112 },
          ].map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-[10px] tracking-wide text-coffee uppercase">{s.label}</dt>
              <dd className="font-serif text-xl font-bold text-brownie">{s.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section aria-labelledby="last-read-title" className="px-5">
        <button
          type="button"
          onClick={() => onSelect(lastRead)}
          className="relative flex w-full items-center gap-4 overflow-hidden rounded-3xl bg-brownie p-4 text-left text-cream transition-transform active:scale-[0.99]"
        >
          <div aria-hidden="true" className="absolute -right-10 -bottom-10 size-36 rounded-full bg-caramel/25 blur-2xl" />
          <BookCover book={lastRead} className="relative w-20 shrink-0" />
          <div className="relative flex min-w-0 flex-col gap-1">
            <span className="text-[10px] font-semibold tracking-widest text-caramel uppercase">Last Read</span>
            <h2 id="last-read-title" className="font-serif text-xl leading-tight font-bold">
              {lastRead.title}
            </h2>
            <p className="text-xs text-cream/75">{lastRead.author}</p>
            <div className="flex items-center gap-2">
              <StarRating value={5} />
              <span className="text-[10px] text-cream/75">Finished Feb 3</span>
            </div>
          </div>
        </button>
      </section>

      <section aria-labelledby="goals-title" className="flex flex-col gap-3 px-5">
        <div className="flex items-center justify-between">
          <h2 id="goals-title" className="font-serif text-lg font-semibold text-brownie">
            Reading Goals
          </h2>
          <span className="flex items-center gap-1 rounded-full bg-caramel/20 px-2.5 py-1 text-[11px] font-semibold text-brownie">
            <Flame className="size-3.5 text-caramel" aria-hidden="true" /> 9-day streak
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <GoalCard
            label="This week"
            value={hours}
            max={5}
            unit="hours"
            onDecrement={() => setHours((h) => Math.max(0, h - 0.5))}
            onIncrement={() => setHours((h) => Math.min(5, h + 0.5))}
          />
          <GoalCard
            label="This year"
            value={booksRead}
            max={20}
            unit="books"
            onDecrement={() => setBooksRead((b) => Math.max(0, b - 1))}
            onIncrement={() => setBooksRead((b) => Math.min(20, b + 1))}
          />
        </div>
      </section>

      <section aria-labelledby="genres-title" className="flex flex-col gap-3 px-5">
        <div className="flex items-baseline justify-between">
          <h2 id="genres-title" className="font-serif text-lg font-semibold text-brownie">
            Preferred Genres
          </h2>
          <span className="text-xs text-coffee">{genres.length} selected</span>
        </div>
        <ul className="flex flex-wrap gap-2">
          {genreOptions.map((g) => {
            const active = genres.includes(g)
            return (
              <li key={g}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleGenre(g)}
                  className={cn(
                    'flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95',
                    active
                      ? 'border-brownie bg-brownie text-cream'
                      : 'border-coffee/30 bg-transparent text-coffee hover:border-coffee',
                  )}
                >
                  {active && <Check className="size-3" aria-hidden="true" />}
                  {g}
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

type GoalCardProps = {
  label: string
  value: number
  max: number
  unit: string
  onIncrement: () => void
  onDecrement: () => void
}

function GoalCard({ label, value, max, unit, onIncrement, onDecrement }: GoalCardProps) {
  const done = value >= max
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-coffee/15 bg-coffee/[0.07] p-4">
      <span className="text-[11px] font-semibold tracking-widest text-coffee uppercase">{label}</span>
      <CircularProgress value={value} max={max}>
        <span className="font-serif text-2xl leading-none font-bold text-brownie">
          {value}
          <span className="text-sm text-coffee">/{max}</span>
        </span>
        <span className="text-[10px] font-medium text-coffee">{unit}</span>
      </CircularProgress>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease ${unit}`}
          onClick={onDecrement}
          className="flex size-8 items-center justify-center rounded-full border border-coffee/25 text-coffee hover:bg-coffee/10 active:scale-90"
        >
          <Minus className="size-4" />
        </button>
        <button
          type="button"
          aria-label={`Increase ${unit}`}
          onClick={onIncrement}
          disabled={done}
          className="flex size-8 items-center justify-center rounded-full bg-caramel text-cream hover:brightness-110 active:scale-90 disabled:opacity-40"
        >
          <Plus className="size-4" />
        </button>
      </div>
      {done && <span className="text-[10px] font-semibold text-caramel">Goal reached!</span>}
    </div>
  )
}
