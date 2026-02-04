'use client';

import { ReactNode, useMemo } from 'react';
import { I18nProvider, Namespace } from '@/i18n';

export default function ClientProviders({ children }: { children: ReactNode }) {
  const namespaces = useMemo<Namespace[]>(() => ['common', 'site'], []);

  return (
    <I18nProvider namespaces={namespaces}>
      {children}
    </I18nProvider>
  );
}
