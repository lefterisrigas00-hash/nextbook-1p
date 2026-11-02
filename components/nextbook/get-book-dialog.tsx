'use client'

import { useState } from 'react'
import { BookOpen, Check, Download, ExternalLink, FileText, Landmark, MapPin, Store, Tablet } from 'lucide-react'
import type { Book } from '@/lib/books'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookCover } from './book-cover'
import { usePhoneContainer } from './phone-container-context'

const stores = [
  { name: 'Public', detail: 'Syntagma, Athens · 1.2 km', price: '€14.90', stock: 'In stock', url: 'https://www.public.gr' },
  { name: 'Politeia', detail: 'Asklipiou 1-3, Athens · 1.8 km', price: '€13.50', stock: 'In stock', url: 'https://www.politeianet.gr' },
  { name: 'Ianos', detail: 'Stadiou 24, Athens · 2.0 km', price: '€14.20', stock: '2 left', url: 'https://www.ianos.gr' },
]

const libraries = [
  { name: 'National Library of Greece', detail: 'SNFCC, Kallithea · 4.5 km', status: 'Available' },
  { name: 'Municipal Library of Athens', detail: 'Domokou 2, Athens · 2.3 km', status: 'Waitlist · 3' },
]

const formats = [
  { id: 'epub', label: 'EPUB', detail: 'Best for Kobo, Apple Books & most readers', size: '1.4 MB', icon: BookOpen },
  { id: 'pdf', label: 'PDF', detail: 'Fixed layout · print-friendly', size: '3.8 MB', icon: FileText },
  { id: 'kindle', label: 'Kindle', detail: 'Direct delivery to your Kindle device', size: '1.9 MB', icon: Tablet },
] as const

type FormatId = (typeof formats)[number]['id']

type GetBookDialogProps = {
  book: Book | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GetBookDialog({ book, open, onOpenChange }: GetBookDialogProps) {
  const container = usePhoneContainer()
  const [format, setFormat] = useState<FormatId>('epub')
  const [downloaded, setDownloaded] = useState<string | null>(null)

  if (!book) return null
  const isDownloaded = downloaded === `${book.id}-${format}`

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) setDownloaded(null)
      }}
    >
      <DialogContent
        container={container}
        className="max-h-[85%] gap-4 overflow-y-auto rounded-3xl bg-cream p-5 text-brownie ring-coffee/20 sm:max-w-[340px]"
      >
        <DialogHeader className="flex-row items-center gap-3 pr-6">
          <BookCover book={book} className="w-12 shrink-0" />
          <div className="min-w-0 text-left">
            <DialogTitle className="font-serif text-lg leading-tight font-bold text-brownie">Get This Book</DialogTitle>
            <DialogDescription className="truncate text-xs text-coffee">
              {book.title} · {book.author}
            </DialogDescription>
          </div>
        </DialogHeader>

        <Tabs defaultValue="physical" className="gap-4">
          <TabsList className="h-11! w-full rounded-full bg-coffee/12 p-1">
            <TabsTrigger
              value="physical"
              className="rounded-full text-xs font-semibold text-coffee data-active:bg-brownie data-active:text-cream"
            >
              <Store aria-hidden="true" />
              Physical Copy
            </TabsTrigger>
            <TabsTrigger
              value="digital"
              className="rounded-full text-xs font-semibold text-coffee data-active:bg-brownie data-active:text-cream"
            >
              <Tablet aria-hidden="true" />
              E-Book / Digital
            </TabsTrigger>
          </TabsList>

          <TabsContent value="physical" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-[11px] font-semibold tracking-widest text-coffee uppercase">Local Bookstores</h3>
              <ul className="flex flex-col gap-2">
                {stores.map((store) => (
                  <li key={store.name}>
                    <a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-2xl border border-coffee/15 bg-coffee/[0.06] p-3 transition-colors hover:border-caramel hover:bg-caramel/10"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-caramel text-cream">
                        <Store className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{store.name}</span>
                        <span className="block truncate text-[11px] text-coffee">{store.detail}</span>
                      </span>
                      <span className="text-right">
                        <span className="block text-sm font-bold">{store.price}</span>
                        <span className="block text-[10px] font-medium text-coffee">{store.stock}</span>
                      </span>
                      <ExternalLink className="size-3.5 shrink-0 text-coffee" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-[11px] font-semibold tracking-widest text-coffee uppercase">Borrow from a Library</h3>
              <ul className="flex flex-col gap-2">
                {libraries.map((lib) => (
                  <li
                    key={lib.name}
                    className="flex items-center gap-3 rounded-2xl border border-coffee/15 p-3"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-coffee text-cream">
                      <Landmark className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{lib.name}</span>
                      <span className="flex items-center gap-1 text-[11px] text-coffee">
                        <MapPin className="size-3" aria-hidden="true" />
                        {lib.detail}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                        lib.status === 'Available' ? 'bg-caramel/20 text-brownie' : 'bg-coffee/10 text-coffee',
                      )}
                    >
                      {lib.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="digital" className="flex flex-col gap-3">
            <div role="radiogroup" aria-label="Choose a format" className="flex flex-col gap-2">
              {formats.map(({ id, label, detail, size, icon: Icon }) => {
                const selected = format === id
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setFormat(id)}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl border p-3 text-left transition-all',
                      selected ? 'border-caramel bg-caramel/15' : 'border-coffee/15 hover:border-coffee/40',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-xl',
                        selected ? 'bg-caramel text-cream' : 'bg-coffee/10 text-coffee',
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{label}</span>
                      <span className="block text-[11px] leading-snug text-coffee">{detail}</span>
                    </span>
                    <span className="text-[10px] font-medium text-coffee">{size}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-coffee/10 px-4 py-2.5">
              <span className="text-xs text-coffee">Digital price</span>
              <span className="font-serif text-lg font-bold">€9.99</span>
            </div>

            <button
              type="button"
              onClick={() => setDownloaded(`${book.id}-${format}`)}
              className={cn(
                'flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold text-cream transition-all active:scale-[0.98]',
                isDownloaded ? 'bg-coffee' : 'bg-caramel hover:brightness-110',
              )}
            >
              {isDownloaded ? (
                <>
                  <Check className="size-4" aria-hidden="true" />
                  {format === 'kindle' ? 'Sent to your Kindle' : 'Added to your Library'}
                </>
              ) : (
                <>
                  <Download className="size-4" aria-hidden="true" />
                  {format === 'kindle' ? 'Kindle Direct Download' : `Download ${formats.find((f) => f.id === format)?.label}`}
                </>
              )}
            </button>
            <p aria-live="polite" className="sr-only">
              {isDownloaded ? 'Download complete' : ''}
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
