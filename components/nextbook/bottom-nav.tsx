'use client'

import { House, LibraryBig, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TabId = 'home' | 'library' | 'profile'

const tabs = [
  { id: 'home' as const, label: 'Home', icon: House },
  { id: 'library' as const, label: 'Library', icon: LibraryBig },
  { id: 'profile' as const, label: 'Profile', icon: UserRound },
]

export function BottomNav({ active, onChange }: { active: TabId; onChange: (tab: TabId) => void }) {
  return (
    <nav aria-label="Main" className="border-t border-coffee/15 bg-cream/95 px-6 pt-2 pb-6 backdrop-blur-md">
      <ul className="flex items-center justify-between">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'group mx-auto flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-caramel focus-visible:outline-none',
                  isActive ? 'text-brownie' : 'text-coffee/60 hover:text-coffee',
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-14 items-center justify-center rounded-full transition-all duration-300',
                    isActive ? 'bg-caramel/25' : 'bg-transparent',
                  )}
                >
                  <Icon className="size-5" strokeWidth={isActive ? 2.4 : 1.8} />
                </span>
                <span className={cn('text-[11px]', isActive ? 'font-semibold' : 'font-medium')}>{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
