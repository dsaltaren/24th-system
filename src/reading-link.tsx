import type { ReactNode } from 'react';
import { ArrowUpRight } from './icons';

export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`external-link ${className || ''}`} title="Opens in a new tab">{children}<ArrowUpRight className="external-mark" size={12} strokeWidth={1.5} aria-hidden="true" /><span className="sr-only"> (external website, opens in a new tab)</span></a>;
}

