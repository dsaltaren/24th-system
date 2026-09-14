import type { ReactNode } from 'react';

export type OverviewItem = { title: string; href: string; description: string; preview: ReactNode };

/** Navigation previews are decorative; the whole card is one native link. */
export function OverviewGrid({ items, label }: { items: OverviewItem[]; label: string }) {
  return <nav className="overview-grid" aria-label={label}>{items.map(item =>
    <a data-interactive-surface className="overview-card" href={item.href} key={item.href}>
      <div className="overview-card-preview" aria-hidden="true">{item.preview}</div>
      <span className="overview-card-title">{item.title}</span>
      <span className="overview-card-description">{item.description}</span>
    </a>
  )}</nav>;
}
