'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Language, LanguageDict } from '@/lib/types'

import en from '../i18n/locales/en.json'
import af from '../i18n/locales/af.json'
import xh from '../i18n/locales/xh.json'
import zu from '../i18n/locales/zu.json'

const dictionaries: Record<Language, LanguageDict> = { 
  en: en as LanguageDict, 
  af: af as LanguageDict, 
  xh: xh as LanguageDict, 
  zu: zu as LanguageDict 
}

interface I18nState {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

export const useI18n = create<I18nState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (language: Language) => set({ language }),
      t: (key: string) => {
        const { language } = get()
        return dictionaries[language]?.[key] ?? key
      }
    }),
    {
      name: 'freshfetch-i18n'
    }
  )
)