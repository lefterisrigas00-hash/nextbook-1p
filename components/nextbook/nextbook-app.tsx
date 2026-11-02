'use client'

import { useEffect, useRef, useState } from 'react'
import { BatteryFull, Signal, Wifi } from 'lucide-react'
import { books, defaultWishlist, type Book } from '@/lib/books'
import { BookDetails } from './book-details'
import { BottomNav, type TabId } from './bottom-nav'
import { GetBookDialog } from './get-book-dialog'
import { HomeScreen } from './home-screen'
import { LibraryScreen } from './library-screen'
import { PhoneContainerContext } from './phone-container-context'
import { ProfileScreen } from './profile-screen'
import { SplashScreen } from './splash-screen'

export function NextBookApp() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [splash, setSplash] = useState<'visible' | 'leaving' | 'done'>('visible')
  const [tab, setTab] = useState<TabId>('home')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [dialogBookId, setDialogBookId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>(defaultWishlist)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const leave = setTimeout(() => setSplash('leaving'), 2800)
    const done = setTimeout(() => setSplash('done'), 3500)
    return () => {
      clearTimeout(leave)
      clearTimeout(done)
    }
  }, [])

  const changeTab = (next: TabId) => {
    setSelectedId(null)
    setTab(next)
    scrollRef.current?.scrollTo({ top: 0 })
  }

  const openBook = (book: Book) => setSelectedId(book.id)
  const openDialog = (book: Book) => {
    setDialogBookId(book.id)
    setDialogOpen(true)
  }
  const toggleSave = (id: string) =>
    setWishlist((list) => (list.includes(id) ? list.filter((x) => x !== id) : [id, ...list]))

  const selectedBook = selectedId ? books[selectedId] : null

  return (
    <PhoneContainerContext.Provider value={container}>
      <div
        ref={setContainer}
        className="relative flex h-full w-full flex-col overflow-hidden bg-cream [transform:translateZ(0)]"
      >
        <StatusBar />

        <main key={tab} ref={scrollRef} className="no-scrollbar animate-in fade-in-0 flex-1 overflow-y-auto duration-300">
          {tab === 'home' && (
            <HomeScreen onSelect={openBook} onGetBook={openDialog} onOpenProfile={() => changeTab('profile')} />
          )}
          {tab === 'library' && <LibraryScreen wishlist={wishlist} onSelect={openBook} onToggleSave={toggleSave} />}
          {tab === 'profile' && <ProfileScreen onSelect={openBook} />}
        </main>

        <BottomNav active={tab} onChange={changeTab} />

        {selectedBook && (
          <BookDetails
            key={selectedBook.id}
            book={selectedBook}
            saved={wishlist.includes(selectedBook.id)}
            onToggleSave={() => toggleSave(selectedBook.id)}
            onBack={() => setSelectedId(null)}
            onSelect={openBook}
            onGetBook={() => openDialog(selectedBook)}
          />
        )}

        <GetBookDialog
          book={dialogBookId ? books[dialogBookId] : null}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />

        {splash !== 'done' && <SplashScreen leaving={splash === 'leaving'} />}
      </div>
    </PhoneContainerContext.Provider>
  )
}

function StatusBar() {
  return (
    <div className="relative z-40 flex h-11 shrink-0 items-center justify-between bg-cream px-7 text-brownie" aria-hidden="true">
      <span className="text-sm font-semibold">9:41</span>
      <div className="absolute top-2 left-1/2 hidden h-7 w-28 -translate-x-1/2 rounded-full bg-brownie sm:block" />
      <div className="flex items-center gap-1.5">
        <Signal className="size-4" />
        <Wifi className="size-4" />
        <BatteryFull className="size-5" />
      </div>
    </div>
  )
}
