'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import './media-reveal.css';

export type MediaRevealProps = {
  children: ReactNode;
  enabled?: boolean;
  pace?: 'intro' | 'quick';
  frameOnHover?: boolean;
  frameLabel?: string;
  mediaKey: string;
  className?: string;
  replayKey?: number;
};

// Opacity samples from the supplied Paper reference, 12 columns per row.
// Resampled across the configured 15 columns; timing is a visual approximation.
const dotPattern = [[0,1,0.97,0.85,0.7,0.58,0.39,0.22,0.06,0,1,1,0.97,0.83,0.61,0.39,0.14,0,0,1,1,0.84,0.68,0.14],
  [0.5,0.25,0.03,0,0,0,1,0.9,0.77,0.61,0.43,0.28,0.13,0,0,1,1,0.9,0.76,0.57,0.41,0.23,0.09,0],
  [0,0.95,0.54,0.15,0,0,0,0,1,0.73,0.52,0.28,0.06,0,0,0,1,0.93,0.73,0.62,0.48,0.32,0.22,0],
  [0.24,0,0,0,1,0.88,0.56,0.06,0,0,0,1,0.9,0.52,0.19,0,0,0,0,1,0.79,0.61,0.45,0.17],
  [1,1,0.88,0.65,0.37,0.08,0,0,0,1,0.72,0.3,0,0,0,0,1,0.62,0.16,0,0,0,0,1],
  [0.25,0.06,0,0,1,0.95,0.77,0.46,0.19,0,0,0,1,0.86,0.57,0.08,0,0,0,1,0.85,0.41,0.1,0],
  [0.31,0.04,0,0,1,0.99,0.72,0.34,0,0,0,0,0.99,0.63,0.18,0,0,0,0,1,0.65,0.3,0.06,0],
  [0,0,0,0,1,0.69,0.25,0,0,0,0,1,0.64,0.3,0,0,0,0,1,0.88,0.55,0.39,0.26,0],
  [0,1,1,0.77,0.39,0,0,0,0,1,0.7,0.23,0,0,0,0,1,0.67,0.34,0,0,0,0,1],
  [1,1,0.71,0.56,0.39,0.17,0,0,0,1,1,0.85,0.7,0.54,0.4,0.25,0.08,0,1,1,0.96,0.86,0.7,0.43],
  [1,1,0.84,0.74,0.57,0.4,0.22,0,0,1,1,0.9,0.68,0.48,0.17,0,0,0,1,0.86,0.53,0.09,0,0],
  [0.37,0.22,0.03,0,0,1,1,0.88,0.73,0.56,0.41,0.28,0.09,0,0,1,1,0.87,0.67,0.48,0.28,0,0,0],
  [0,0,1,1,0.94,0.79,0.64,0.51,0.34,0.15,0,0,1,1,0.89,0.67,0.48,0.21,0,0,0,1,1,0.55],
  [0,0.63,0.37,0.18,0,0,0,1,1,0.86,0.72,0.56,0.37,0.25,0.09,0,0,1,0.97,0.85,0.69,0.54,0.39,0.09],
  [0,0,1,0.64,0.26,0,0,0,0,1,0.88,0.61,0.42,0.21,0,0,0,1,1,0.89,0.74,0.56,0.48,0.27],
  [0.61,0.26,0,0,0,0,0.96,0.56,0.12,0,0,0,0,0.99,0.63,0.32,0,0,0,0,1,0.92,0.77,0.51],
  [0,0,1,0.93,0.68,0.4,0.08,0,0,0,1,0.73,0.34,0,0,0,0,1,0.69,0.27,0,0,0,0],
  [0.54,0.34,0.12,0,0,1,1,0.79,0.55,0.26,0,0,0,1,0.94,0.55,0.12,0,0,0,1,0.84,0.62,0.06],
  [0.61,0.37,0.05,0,0,0,1,0.75,0.37,0,0,0,0,1,0.65,0.26,0,0,0,0,1,0.73,0.52,0.08],
  [0.41,0.05,0,0,0,1,0.73,0.32,0,0,0,0,1,0.76,0.37,0.06,0,0,0,1,0.93,0.72,0.61,0.32],
  [0,0,0,1,0.77,0.4,0,0,0,0,1,0.71,0.3,0,0,0,0,1,0.8,0.45,0.13,0,0,0],
  [0,0,1,0.88,0.67,0.5,0.32,0.13,0,0,1,1,0.96,0.78,0.66,0.51,0.34,0.17,0,0,1,1,0.96,0.72],
  [0,1,1,0.97,0.81,0.64,0.48,0.28,0.08,0,0,1,0.99,0.77,0.54,0.23,0,0,0,1,0.86,0.54,0.28,0],
  [0.7,0.51,0.34,0.15,0,0,1,1,0.99,0.85,0.68,0.54,0.39,0.22,0.06,0,1,1,0.93,0.74,0.55,0.32,0.14,0]];

const entranceHistory = new WeakMap<Element | Document, { count: number; seen: WeakSet<Element> }>();

/** Real media stays mounted; animation is an enhancement over its native loading. */
export function MediaReveal({ children, enabled = false, pace = 'intro', frameOnHover = false, frameLabel = 'Frame', mediaKey, className = '', replayKey = 0 }: MediaRevealProps) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const ownerPage = node.closest('[data-surface-entry-root]') ?? document;
    const history = entranceHistory.get(ownerPage) ?? { count: 0, seen: new WeakSet<Element>() };
    entranceHistory.set(ownerPage, history);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stopped = false;
    let started = false;
    let waitingForSurface = false;
    let observer: IntersectionObserver | undefined;
    const cleanups: (() => void)[] = [];
    const phase = (value: string) => { if (!stopped) node.dataset.phase = value; };
    const clear = () => { observer?.disconnect(); cleanups.splice(0).forEach(cleanup => cleanup()); };
    const settle = () => {
      if (started && !history.seen.has(node)) { history.seen.add(node); history.count += 1; }
      phase('ready'); stopped = true; clear();
    };
    const preference = () => { if (reduced.matches) settle(); };
    if (!enabled || reduced.matches) { phase('ready'); return; }
    const styles = getComputedStyle(node);
    const duration = (token: string, fallback: number) => {
      const value = styles.getPropertyValue(token).trim();
      const parsed = parseFloat(value) * (value.endsWith('ms') ? 1 : 1000);
      return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback;
    };
    const delay = (milliseconds: number) => new Promise<void>(resolve => {
      const timer = window.setTimeout(resolve, milliseconds);
      cleanups.push(() => { window.clearTimeout(timer); resolve(); });
    });
    const imageReady = (image: HTMLImageElement) => new Promise<boolean>(resolve => {
      let done = false;
      const finish = (success: boolean) => {
        if (done) return;
        done = true;
        image.removeEventListener('load', loaded);
        image.removeEventListener('error', failed);
        resolve(success);
      };
      const loaded = () => {
        if (!image.naturalWidth) { finish(false); return; }
        // Browsers can reject decode for valid SVGs; native load remains authoritative.
        if (image.decode) void image.decode().then(() => finish(true), () => finish(image.naturalWidth > 0));
        else finish(true);
      };
      const failed = () => finish(false);
      cleanups.push(() => finish(false));
      if (image.complete) loaded();
      else { image.addEventListener('load', loaded); image.addEventListener('error', failed); }
    });
    const start = async () => {
      if (started || stopped) return;
      const owner = node.closest<HTMLElement>('[data-surface]');
      const entering = owner?.closest('[data-surface-entry-root]');
      if (owner && entering && entering.getAttribute('data-surface-entry-root') !== 'ready' && owner.dataset.surfaceEntrance !== 'ready') {
        if (!waitingForSurface) {
          waitingForSurface = true;
          const resume = () => { waitingForSurface = false; void start(); };
          owner.addEventListener('surface-enter-ready', resume, { once: true });
          entering.addEventListener('surface-enter-ready', resume, { once: true });
          cleanups.push(() => { owner.removeEventListener('surface-enter-ready', resume); entering.removeEventListener('surface-enter-ready', resume); });
        }
        return;
      }
      node.dataset.pace = history.count >= 3 && pace !== 'intro' ? 'subtle' : pace;
      started = true;
      observer?.disconnect();
      const images = Array.from(node.querySelectorAll('img'));
      for (const video of node.querySelectorAll('video[poster]')) {
        const poster = new window.Image();
        poster.src = (video as HTMLVideoElement).poster;
        images.push(poster);
      }
      const loaded = Promise.all(images.map(imageReady));
      phase('surface');
      node.querySelectorAll<HTMLElement>('.media-reveal-agent i').forEach((dot, index) => {
        const column = index % 15;
        const row = Math.floor(index / 15);
        const samples = dotPattern[row * 12 + Math.round(column * 11 / 14)];
        const animation = dot.animate([{ opacity: 0 }, ...samples.map(opacity => ({ opacity })), { opacity: 0 }], {
          duration: 2400, iterations: Infinity, delay: column * 10 + row * 5, fill: 'both',
        });
        cleanups.push(() => animation.cancel());
      });
      await delay(duration('--media-reveal-surface', 180));
      if (stopped) return;
      phase('working');
      const [result] = await Promise.all([
        Promise.race([loaded, delay(15000).then(() => [false])]),
        delay(duration('--media-reveal-work', 360)),
      ]);
      if (stopped) return;
      if (!result.every(Boolean)) { phase('error'); stopped = true; clear(); return; }
      phase('revealing');
      // Settle when the browser completes the fade, not a competing timer.
      const animations = node.querySelector('.media-reveal-content')?.getAnimations() ?? [];
      if (animations.length) await Promise.all(animations.map(animation => animation.finished.catch(() => {})));
      else await delay(duration('--media-reveal-content', 720));
      if (!stopped) settle();
    };
    phase('idle');
    reduced.addEventListener('change', preference);
    if ('IntersectionObserver' in window) {
      // Start in the upper reading zone, not when a following image peeks in at the bottom.
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) void start();
      }, { threshold: 0, rootMargin: `0px 0px -${Math.round(window.innerHeight * .4)}px 0px` });
      observer.observe(node);
    } else void start();
    return () => { stopped = true; clear(); reduced.removeEventListener('change', preference); };
  }, [enabled, mediaKey, replayKey, pace]);

  return <div ref={root} className={`media-reveal ${className}`} data-media-reveal data-pace={pace} data-phase={enabled ? 'idle' : 'ready'} data-frame-hover={frameOnHover || undefined}>
    <noscript><style>{`.media-reveal > .media-reveal-content { opacity: 1 !important; }`}</style></noscript>
    <div className="media-reveal-content">{children}</div>
    <span className="media-reveal-agent" aria-hidden="true">{Array.from({ length: 30 }, (_, index) => <i key={index} />)}</span>
    {frameOnHover && <span className="media-reveal-frame" aria-hidden="true">
      <span className="media-reveal-label">{frameLabel}</span><i /><i /><i /><i />
    </span>}
  </div>;
}
