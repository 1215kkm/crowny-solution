'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import React from 'react';

export type Locale = 'ko' | 'en' | 'zh' | 'ja' | 'vi' | 'th';
export type Namespace = 'common' | 'market' | 'admin' | 'site';

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', label: 'ภาษาไทย', flag: '🇹🇭' },
];

// Translation dictionaries loaded per locale
type TranslationDict = Record<string, string>;
type LoadedTranslations = Partial<Record<Namespace, TranslationDict>>;

// Cache for loaded translations
const translationCache: Partial<Record<Locale, LoadedTranslations>> = {};

async function loadTranslations(locale: Locale, ns: Namespace): Promise<TranslationDict> {
  if (translationCache[locale]?.[ns]) {
    return translationCache[locale]![ns]!;
  }

  try {
    const mod = await import(`./locales/${locale}/${ns}.json`);
    const dict = mod.default as TranslationDict;

    if (!translationCache[locale]) {
      translationCache[locale] = {};
    }
    translationCache[locale]![ns] = dict;

    return dict;
  } catch {
    console.warn(`Missing translation: ${locale}/${ns}`);
    return {};
  }
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'ko',
  setLocale: () => {},
  t: (key: string) => key,
  isLoading: true,
});

export function useTranslation() {
  return useContext(I18nContext);
}

interface I18nProviderProps {
  children: ReactNode;
  namespaces?: Namespace[];
  defaultLocale?: Locale;
}

export function I18nProvider({
  children,
  namespaces = ['common'],
  defaultLocale = 'ko',
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<LoadedTranslations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load saved locale from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('crowny-locale') as Locale | null;
    if (saved && LOCALES.some(l => l.code === saved)) {
      setLocaleState(saved);
    }
  }, []);

  // Load translations when locale or namespaces change
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    Promise.all(
      namespaces.map(ns => loadTranslations(locale, ns).then(dict => [ns, dict] as const))
    ).then(results => {
      if (cancelled) return;
      const loaded: LoadedTranslations = {};
      for (const [ns, dict] of results) {
        loaded[ns] = dict;
      }
      setTranslations(loaded);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [locale, namespaces]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('crowny-locale', newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      // key format: "namespace.key" or just "key" (defaults to common)
      let ns: Namespace = 'common';
      let actualKey = key;

      const dotIndex = key.indexOf('.');
      if (dotIndex !== -1) {
        const prefix = key.substring(0, dotIndex) as Namespace;
        if (['common', 'market', 'admin', 'site'].includes(prefix)) {
          ns = prefix;
          actualKey = key.substring(dotIndex + 1);
        }
      }

      const dict = translations[ns];
      let value = dict?.[actualKey] ?? actualKey;

      // Replace params: {name} -> value
      if (params) {
        for (const [paramKey, paramValue] of Object.entries(params)) {
          value = value.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
        }
      }

      return value;
    },
    [translations]
  );

  return React.createElement(
    I18nContext.Provider,
    { value: { locale, setLocale, t, isLoading } },
    children
  );
}
