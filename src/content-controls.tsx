'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { ChevronLeft, ChevronRight } from './icons';
import { SurfaceHeader } from './surface-header';
import { useStickyHeader } from './scroll-header';
import { createSurfaceFeedback } from './surface-feedback';
import { Disclosure } from './disclosure';

export type TabItem = { value: string; label: string; content: ReactNode; disabled?: boolean };
export function Tabs({ label, items, value, defaultValue, onValueChange, size = 'regular', sticky = false, stickyOffset = '0px', stickyInset = '0px' }: {
  label: string; items: TabItem[]; value?: string; defaultValue?: string; onValueChange?: (value: string) => void;
  size?: 'regular' | 'compact'; sticky?: boolean; stickyOffset?: string; stickyInset?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const tabList = useRef<HTMLDivElement>(null);
  useStickyHeader(root, header, sticky);
  useEffect(() => {
    const list = tabList.current;
    if (!sticky || !list) return;
    const updateOverflow = () => {
      const maximum = Math.max(0, list.scrollWidth - list.clientWidth);
      const position = Math.min(maximum, Math.abs(list.scrollLeft));
      const rtl = getComputedStyle(list).direction === 'rtl';
      list.toggleAttribute('data-overflow-left', rtl ? position < maximum - 1 : position > 1);
      list.toggleAttribute('data-overflow-right', rtl ? position > 1 : position < maximum - 1);
    };
    const revealFocusedTab = (event: FocusEvent) => {
      const tab = event.target;
      if (!(tab instanceof HTMLElement) || tab.getAttribute('role') !== 'tab') return;
      const bounds = list.getBoundingClientRect();
      const target = tab.getBoundingClientRect();
      const distance = target.left < bounds.left ? target.left - bounds.left : target.right > bounds.right ? target.right - bounds.right : 0;
      if (distance) list.scrollBy({ left: distance, behavior: 'instant' });
      updateOverflow();
    };
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(list);
    for (const tab of list.children) observer.observe(tab);
    list.addEventListener('scroll', updateOverflow, { passive: true });
    list.addEventListener('focusin', revealFocusedTab);
    updateOverflow();
    return () => {
      observer.disconnect();
      list.removeEventListener('scroll', updateOverflow);
      list.removeEventListener('focusin', revealFocusedTab);
      list.removeAttribute('data-overflow-left');
      list.removeAttribute('data-overflow-right');
    };
  }, [sticky, items]);
  const feedback = useMemo(() => createSurfaceFeedback(), []);
  useEffect(() => {
    window.addEventListener('resize', feedback.stop);
    window.addEventListener('hashchange', feedback.stop);
    return () => { window.removeEventListener('resize', feedback.stop); window.removeEventListener('hashchange', feedback.stop); feedback.stop(); };
  }, [feedback, value]);
  const index = <BaseTabs.List ref={tabList} className="content-tabs-list" aria-label={label}>
      {items.map(item => <BaseTabs.Tab className="content-tab" key={item.value} value={item.value} disabled={item.disabled} onClick={event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || event.currentTarget.getAttribute('aria-selected') !== 'true') return;
        const panel = root.current?.querySelector<HTMLElement>('[role="tabpanel"]:not([inert]):not([hidden])');
        if (panel) { event.preventDefault(); feedback.play(panel); }
      }}>{item.label}</BaseTabs.Tab>)}
      <BaseTabs.Indicator className="content-tabs-indicator" />
    </BaseTabs.List>;
  return <BaseTabs.Root ref={root} className="content-tabs" data-size={size} data-sticky={sticky || undefined} style={{ '--tabs-sticky-offset': stickyOffset, '--tabs-surface-inset': stickyInset } as CSSProperties} value={value} defaultValue={defaultValue ?? items.find(item => !item.disabled)?.value}
    onValueChange={next => { feedback.stop(); if (typeof next === 'string') onValueChange?.(next); }}>
    {sticky ? <SurfaceHeader ref={header} standard className="content-tabs-header">{index}</SurfaceHeader> : index}

    {items.map(item => <BaseTabs.Panel className="content-tab-panel" key={item.value} value={item.value}>{item.content}</BaseTabs.Panel>)}
  </BaseTabs.Root>;
}

export type AccordionItem = { id: string; title: string; content: ReactNode };
export function Accordion({ items, defaultOpen = [] }: { items: AccordionItem[]; defaultOpen?: string[] }) {
  return <div className="content-accordion" data-disclosure-group>{items.map(item => <Disclosure key={item.id} title={item.title} defaultOpen={defaultOpen.includes(item.id)} contentClassName="content-accordion-panel">{item.content}</Disclosure>)}</div>;
}

export type TableColumn<Row> = { key: string; header: string; render: (row: Row) => ReactNode };
export function DataTable<Row>({ caption, columns, rows, rowKey }: {
  caption: string; columns: TableColumn<Row>[]; rows: Row[]; rowKey: (row: Row) => string;
}) {
  // A wide table must remain horizontally scrollable with the keyboard.
  // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
  return <section className="content-table-scroll" aria-label={caption} tabIndex={0}>
    <table className="content-table"><caption>{caption}</caption><thead><tr>{columns.map(column => <th key={column.key} scope="col">{column.header}</th>)}</tr></thead>
      <tbody>{rows.map(row => <tr key={rowKey(row)}>{columns.map(column => <td key={column.key}>{column.render(row)}</td>)}</tr>)}</tbody>
    </table>
  </section>;
}

export function Badge({ children, status = 'neutral' }: { children: ReactNode; status?: 'neutral' | 'success' | 'error' }) {
  return <span className="content-badge" data-status={status}>{children}</span>;
}

export type BreadcrumbItem = { label: string; href?: string };
export function Breadcrumbs({ items, label = 'Breadcrumb', className = '', current }: { items: BreadcrumbItem[]; label?: string; className?: string; current?: ReactNode }) {
  return <nav className={`content-breadcrumbs ${className}`} aria-label={label}><ol>{items.map((item, index) => <li key={`${index}:${item.label}`}>
    {index > 0 && <span className="content-breadcrumb-separator" aria-hidden="true">/</span>}
    {index === items.length - 1 ? current ?? <span aria-current="page">{item.label}</span> : item.href ? <a className="reading-link" href={item.href}>{item.label}</a> : <span>{item.label}</span>}
  </li>)}</ol></nav>;
}

export function Pagination({ page, pageCount, onPageChange, label = 'Pagination', size = 'regular' }: {
  page: number; pageCount: number; onPageChange: (page: number) => void; label?: string; size?: 'regular' | 'compact';
}) {
  const total = Math.max(1, Math.floor(pageCount));
  const current = Math.min(total, Math.max(1, Math.floor(page)));
  const pages = [...new Set([1, current - 1, current, current + 1, total].filter(value => value >= 1 && value <= total))].sort((a, b) => a - b);
  return <nav className="content-pagination" data-size={size} aria-label={label}>
    <button type="button" disabled={current === 1} onClick={() => onPageChange(current - 1)} aria-label="Previous page"><ChevronLeft size={16} strokeWidth={1.5} aria-hidden="true" /></button>
    {pages.map((number, index) => <span className="content-pagination-item" key={number}>
      {index > 0 && number - pages[index - 1] > 1 && <span className="content-pagination-gap" aria-hidden="true">...</span>}
      <button type="button" aria-label={`Page ${number}`} aria-current={number === current ? 'page' : undefined} onClick={() => { if (number !== current) onPageChange(number); }}>{number}</button>
    </span>)}
    <button type="button" disabled={current === total} onClick={() => onPageChange(current + 1)} aria-label="Next page"><ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" /></button>
  </nav>;
}

export function ContentPreview({ id }: { id: string }) {
  const [page, setPage] = useState(1);
  return <div className="content-example" data-content-example={id}>
    {id === 'tabs' && <Tabs label="Project details" items={[
      { value: 'overview', label: 'Overview', content: <p>A reading workspace for research notes and saved articles.</p> },
      { value: 'activity', label: 'Activity', content: <p>Maya added three articles to the research collection today.</p> },
      { value: 'archive', label: 'Archive', disabled: true, content: <p>Archived changes.</p> },
    ]} />}
    {id === 'accordion' && <Accordion items={[
      { id: 'files', title: 'What is included?', content: <p>The final layouts, a clickable prototype and the original design files.</p> },
      { id: 'install', title: 'When will the files arrive?', content: <p>You will receive a download link within two working days of approval.</p> },
    ]} />}
    {id === 'table' && <DataTable caption="Project status" rows={[
      { id: 'reading', name: '24th', status: 'Published' },
      { id: 'library', name: 'Component library', status: 'In progress' },
    ]} rowKey={row => row.id} columns={[
      { key: 'name', header: 'Project', render: row => row.name },
      { key: 'status', header: 'Status', render: row => row.status },
    ]} />}
    {id === 'badge' && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}><Badge>Draft</Badge><Badge status="success">Published</Badge><Badge status="error">Needs attention</Badge></div>}
    {id === 'breadcrumbs' && <Breadcrumbs items={[{ label: 'Components', href: '#components' }, { label: 'Breadcrumbs' }]} />}
    {id === 'pagination' && <><p aria-live="polite">Page {page} of 8</p><Pagination size="compact" page={page} pageCount={8} onPageChange={setPage} /></>}
  </div>;
}
