'use client';

import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { ChevronRight } from './icons';
import './disclosure.css';

/** Adjacent disclosure rows share one dividing rule and their outside corners. */
export function DisclosureGroup({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`disclosure-group ${className}`} data-disclosure-group>{children}</div>;
}

export type DisclosureProps = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> & {
  title: ReactNode;
  children: ReactNode;
  density?: 'regular' | 'reading';
  defaultOpen?: boolean;
  lazy?: boolean;
  actions?: ReactNode;
  contentClassName?: string;
};

/** Native disclosure with optional lazy content and independent header actions. */
export function Disclosure({ title, children, defaultOpen = false, density = 'regular', lazy = false, actions, className = '', contentClassName = '', ...props }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  return <div {...props} className={`disclosure-surface ${className}`} data-disclosure data-density={density} data-disclosure-actions={actions ? '' : undefined}>
    <details className="disclosure-details" open={open} onToggle={event => setOpen(event.currentTarget.open)}>
      <summary className="disclosure-heading" data-interactive-surface>
        <ChevronRight className="disclosure-chevron" size={16} strokeWidth={1.5} aria-hidden="true" />
        <span className="disclosure-title">{title}</span>
      </summary>
      {(!lazy || open) && <div className={`disclosure-body ${contentClassName}`}>{children}</div>}
    </details>
    {actions}
  </div>;
}
