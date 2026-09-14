'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, Copy } from './icons';
import { Disclosure, DisclosureGroup } from './disclosure';

export function CodeBlock({ name, source }: { name: string; source: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const reset = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(reset.current), []);

  async function copySource() {
    clearTimeout(reset.current);
    try {
      await navigator.clipboard.writeText(source);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
    reset.current = setTimeout(() => setStatus('idle'), 2400);
  }

  return (
    <Disclosure className="code-block" title={<span className="code-block-name">{name}</span>} contentClassName="code-block-body" actions={<>
      <button data-interactive-surface className="code-block-copy" type="button" onClick={copySource}
        aria-label={`Copy ${name} source`}>
        {status === 'copied' ? <Check size={14} strokeWidth={1.5} aria-hidden="true" /> : <Copy size={14} strokeWidth={1.5} aria-hidden="true" />}
        <span>{status === 'copied' ? 'Copied' : 'Copy'}</span>
      </button>
      <output className="code-block-status" aria-live="polite">
        {status === 'copied' ? `${name} copied.` : status === 'failed' ? 'Could not copy. Open the source and select its text to copy.' : ''}
      </output>
    </>}>
      {/* Keyboard users need focus to scroll long source in both directions. */}
      {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <pre className="code-block-source" tabIndex={0} aria-label={`${name} source`}>
        <code>{source}</code>
      </pre>
    </Disclosure>
  );
}

/** Contiguous source files share their borders without inheriting document gaps. */
export function CodeBlockGroup({ children }: { children: ReactNode }) { return <DisclosureGroup className="code-block-group">{children}</DisclosureGroup>; }
