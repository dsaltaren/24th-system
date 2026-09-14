'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { narrowViewport } from './viewport';

/** Keep a reading baseline or a fixed image gap without changing the reserved media box. */
export type CaptionSpacing = 'reading' | 'image' | 'flow';
export function RhythmCaption({ children, spacing = 'reading' }: { children: ReactNode; spacing?: CaptionSpacing }) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const caption = ref.current;
    const media = caption?.parentElement?.querySelector('img,video');
    const copy = caption?.firstElementChild;
    if (!caption || !media || !copy) return;
    const context = document.createElement('canvas').getContext('2d');
    if (!context && spacing === 'reading') return;
    let alive = true;
    const measure = () => {
      if (!alive) return;
      const style = getComputedStyle(caption);
      const step = parseFloat(style.lineHeight);
      const clearance = parseFloat(style.getPropertyValue('--caption-clearance')) || 4;
      const current = parseFloat(style.getPropertyValue('--caption-lift')) || 0;
      const bounds = media.getBoundingClientRect();
      const scale = bounds.width / parseFloat(getComputedStyle(media).width);
      if (!Number.isFinite(scale) || scale <= 0) return;
      if (spacing === 'image' || spacing === 'flow') {
        // Remove reserved media slack, keeping an exact gap from the actual image.
        const gap = (caption.getBoundingClientRect().top - bounds.bottom) / scale + current;
        const lift = gap - 8;
        if (Math.abs(lift - current) > .01) caption.style.setProperty('--caption-lift', `${lift}px`);
        // Keep subsequent content on its cadence even when 20px caption lines wrap.
        const reserved = parseFloat(style.getPropertyValue('--caption-reserve')) || 0;
        const naturalHeight = caption.parentElement!.getBoundingClientRect().height / scale - reserved;
        const cadence = !matchMedia(narrowViewport).matches ? 28 : 4;
        const reserve = spacing === 'flow' ? 0 : Math.max(0, Math.ceil((naturalHeight - .01) / cadence) * cadence - naturalHeight);
        if (Math.abs(reserve - reserved) > .01) caption.style.setProperty('--caption-reserve', `${reserve}px`);
        return;
      }
      if (!context) return;
      const font = getComputedStyle(copy);
      const inkOffset = parseFloat(style.getPropertyValue('--caption-ink-offset')) || 0;
      context.font = `${font.fontWeight} ${font.fontSize} ${font.fontFamily}`;
      const ascent = context.measureText(copy.textContent || 'H').actualBoundingBoxAscent;
      const probe = document.createElement('i');
      probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
      copy.prepend(probe);
      const baseline = probe.getBoundingClientRect().top;
      probe.remove();
      // Focus-view motion scales the sheet uniformly; calculate spacing in CSS pixels.
      const gap = (baseline - bounds.bottom) / scale - ascent + current - inkOffset;
      const lift = !matchMedia(narrowViewport).matches ? Math.max(0, Math.floor((gap - clearance) / step) * step) : 0;
      if (lift !== current) caption.style.setProperty('--caption-lift', `${lift}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(media);
    observer.observe(caption);
    void document.fonts.ready.then(measure);
    media.addEventListener('load', measure);
    media.addEventListener('loadedmetadata', measure);
    window.addEventListener('resize', measure);
    return () => {
      alive = false; observer.disconnect();
      media.removeEventListener('load', measure);
      media.removeEventListener('loadedmetadata', measure);
      window.removeEventListener('resize', measure);
    };
  }, [children, spacing]);
  return <figcaption ref={ref} data-caption-spacing={spacing} aria-live="polite"><span className="caption-copy">{children}</span></figcaption>;
}
