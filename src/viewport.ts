'use client';

import { useSyncExternalStore } from 'react';

/** One reading pane up to 1023px, three adjoining surfaces from 1024px. The stylesheets repeat the same boundary. */
export const narrowViewport = '(max-width: 1023px)';
const subscribe = (notify: () => void) => {
  const query = window.matchMedia(narrowViewport);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};
export function useNarrowViewport() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(narrowViewport).matches, () => false);
}
