'use client';
import { useId, type ComponentProps, type ReactNode } from 'react';
import { Circle } from './icons';
import { Button, TextField } from './form-controls';

export function IconButton({ label, children, ...props }: Omit<ComponentProps<typeof Button>, 'children' | 'aria-label'> & { label: string; children: ReactNode }) {
  return <Button {...props} aria-label={label} className={`icon-button ${props.className || ''}`}><span aria-hidden="true">{children}</span></Button>;
}
export function SearchField(props: Omit<ComponentProps<typeof TextField>, 'type'>) {
  return <TextField {...props} type="search" />;
}
export function Choicebox({ label, name, value, onValueChange, options, disabled }: {
  label: string; name: string; value: string; onValueChange: (value: string) => void; disabled?: boolean;
  options: { value: string; label: string; description?: string; disabled?: boolean }[];
}) {
  const id = useId();
  return <fieldset className="choicebox" disabled={disabled}><legend>{label}</legend><div className="choicebox-options">{options.map((option, index) =>
    <label key={option.value} className="choicebox-option" htmlFor={`${id}-${index}`}>
      <input id={`${id}-${index}`} type="radio" name={name} value={option.value} disabled={option.disabled} checked={value === option.value} onChange={() => onValueChange(option.value)} />
      <Circle className="choicebox-mark" size={6} fill="currentColor" strokeWidth={0} aria-hidden="true" /><span>{option.label}</span>{option.description && <small>{option.description}</small>}
    </label>)}</div></fieldset>;
}
