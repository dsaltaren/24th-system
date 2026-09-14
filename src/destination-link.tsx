'use client';

import { useEffect, useMemo, type ComponentProps, type RefObject } from 'react';
import { createSurfaceFeedback } from './surface-feedback';

/** One native link owns navigation and acknowledgement of its current destination. */
export function DestinationLink({ current = false, targetRef, onClick, href, children, ...props }: ComponentProps<'a'> & { href: string; current?: boolean; targetRef: RefObject<HTMLElement | null> }) {
  const feedback = useMemo(() => createSurfaceFeedback(), []);
  useEffect(() => {
    window.addEventListener('resize', feedback.stop);
    window.addEventListener('hashchange', feedback.stop);
    return () => {
      window.removeEventListener('resize', feedback.stop);
      window.removeEventListener('hashchange', feedback.stop);
      feedback.stop();
    };
  }, [feedback, current]);
  return <a {...props} href={href} aria-current={current ? 'page' : undefined} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || !current || !targetRef.current || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    feedback.play(targetRef.current);
  }}>{children}</a>;
}
