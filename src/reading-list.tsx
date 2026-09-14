'use client';

import type { RefObject } from 'react';
import { DestinationLink } from './destination-link';

export type ReadingListItem = { label: string; href: string; current?: boolean; description?: string };

/** Reusable navigation with explicit density and separator variants. */
export function ReadingList({ label, items, size = 'regular', separators = 'none', selection = 'surface', targetRef, intro, sections }: { label: string; intro?: string; items: ReadingListItem[]; sections?: { label: string; items: ReadingListItem[] }[]; targetRef: RefObject<HTMLElement | null>; size?: 'regular' | 'compact'; separators?: 'between' | 'none'; selection?: 'text' | 'surface' }) {
  const list = (entries: ReadingListItem[]) => <ul>{entries.map(item =>
    <li key={item.href}><DestinationLink data-interactive-surface data-surface-shape="square" href={item.href} current={item.current} targetRef={targetRef}>
      <span>{item.label}</span>{item.description && <small>{item.description}</small>}
    </DestinationLink></li>
  )}</ul>;
  return <nav aria-label={label} className="reading-list" data-size={size} data-separators={separators} data-selection={selection}>
    {intro && <p className="reading-list-intro">{intro}</p>}
    {sections ? sections.map(section => <div className="reading-list-section" key={section.label}>
      <h3 className="reading-list-heading">{section.label}</h3>{list(section.items)}
    </div>) : list(items)}
  </nav>;
}
