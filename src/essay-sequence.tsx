'use client';

import { useId, useState } from 'react';
import './essay-sequence.css';

/** Reading controls change presentation, never the author's wording. */
export function EssaySequence({ items }: { items: string[] }) {
  const id = useId();
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const labels = items.map(item => {
    const colon = item.indexOf(':');
    return colon > 0 && colon < 20 ? item.slice(0, colon) : '';
  });
  return <section className="essay-sequence" aria-label="Read this passage step by step">
    <div className="essay-sequence-top">
      <span>{expanded ? `${items.length} parts` : `${index + 1} of ${items.length}`}</span>
      <button type="button" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)}>{expanded ? 'One at a time' : 'Read all'}</button>
    </div>
    {!expanded && <ol className="essay-sequence-steps">{items.map((_, step) => <li key={step}>
      <button type="button" onClick={() => setIndex(step)} aria-current={index === step ? 'step' : undefined} aria-controls={id} aria-label={labels[step] || `Part ${step + 1}`}>
        <span>{step + 1}</span>
        {labels[step] && <small>{labels[step] === 'Read the response' ? 'Read' : labels[step]}</small>}
      </button>
    </li>)}</ol>}
    <div id={id} className="essay-sequence-copy" aria-live="polite" aria-atomic="true">
      {expanded ? <ul>{items.map((item, step) => <li key={step}>{item}</li>)}</ul> : items.map((item, step) => <p key={step} data-current={step === index || undefined} aria-hidden={step !== index || undefined}>{item}</p>)}
    </div>
    {!expanded && <div className="essay-sequence-actions">
      <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>Previous</button>
      <button type="button" disabled={index === items.length - 1} onClick={() => setIndex(index + 1)}>Next</button>
    </div>}
  </section>;
}
