'use client'

import { createContext, useContext } from 'react'

export const PhoneContainerContext = createContext<HTMLElement | null>(null)

export function usePhoneContainer() {
  return useContext(PhoneContainerContext)
}
