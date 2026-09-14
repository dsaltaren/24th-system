'use client';

import { useId } from 'react';
import { TextArea } from './form-controls';
import './essay-prompt.css';

export function EssayPrompt({ label, placeholder }: { label: string; placeholder: string }) {
  const id = useId();
  return <div className="essay-prompt"><TextArea id={id} label={label} placeholder={`Write here… ${placeholder}`} rows={2} /></div>;
}
