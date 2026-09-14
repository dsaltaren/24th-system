'use client';

import { useEffect, type RefObject } from 'react';

/** Follow the actual scroll surface, including tablet page scroll and focus view. */
export function useScrollHeader(surface: RefObject<HTMLElement | null>, resetKey: string) {
  useEffect(() => {
    const node = surface.current;
    if (!node) return;
    const chrome = node.matches('.layer-body') ? node.closest<HTMLElement>('.layer-sheet') : node;
    if (!chrome) return;
    const header = chrome.querySelector<HTMLElement>(':scope > .surface-header');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (header) chrome.style.setProperty('--surface-header-height', `${header.getBoundingClientRect().height}px`);
      const independent = /(auto|scroll)/.test(getComputedStyle(node).overflowY);
      const distance = Math.max(0, independent ? node.scrollTop : -node.getBoundingClientRect().top);
      chrome.toggleAttribute('data-scrolled', distance > .5);
      const ramp = parseFloat(getComputedStyle(node).getPropertyValue('--shadow-ramp')) || 16;
      chrome.style.setProperty('--scroll-depth', String(Math.min(1, distance / ramp)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    if (header) observer.observe(header);
    window.addEventListener('scroll', schedule, { capture: true, passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
    };
  }, [surface, resetKey]);
}

/** A nested sticky header takes over the same edge once it reaches its offset. */
export function useStickyHeader(root: RefObject<HTMLElement | null>, header: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const node = root.current, edge = header.current;
    if (!enabled || !node || !edge) return;
    let owner = node.parentElement;
    while (owner && !/(auto|scroll)/.test(getComputedStyle(owner).overflowY)) owner = owner.parentElement;
    const scrollOwner = owner;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = edge.getBoundingClientRect();
      const boundary = (scrollOwner ? scrollOwner.getBoundingClientRect().top + scrollOwner.clientTop : 0) + (parseFloat(getComputedStyle(edge).top) || 0);
      const displacement = Math.max(0, bounds.top - node.getBoundingClientRect().top);
      const attached = Math.abs(bounds.top - boundary) <= 1 && displacement > .5;
      const ramp = parseFloat(getComputedStyle(edge).getPropertyValue('--shadow-ramp')) || 16;
      edge.toggleAttribute('data-sticky-attached', attached);
      edge.style.setProperty('--scroll-depth', String(attached ? Math.min(1, displacement / ramp) : 0));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(node); observer.observe(edge); if (scrollOwner) observer.observe(scrollOwner);
    window.addEventListener('scroll', schedule, {capture:true, passive:true});
    window.addEventListener('resize', schedule); update();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('scroll', schedule, true); window.removeEventListener('resize', schedule);
      edge.removeAttribute('data-sticky-attached'); edge.style.removeProperty('--scroll-depth');
    };
  }, [root, header, enabled]);
}
