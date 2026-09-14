'use client';

import { useId, type ReactNode } from 'react';
import { Circle } from './icons';

type SwitchProps = {
  id?: string; label: string; checked: boolean; onCheckedChange: (checked: boolean) => void;
  disabled?: boolean; name?: string;
};

export function Switch({ id, label, checked, onCheckedChange, disabled, name }: SwitchProps) {
  const generatedId = useId();
  return <label className="selection-switch" htmlFor={id || generatedId}>
    <input id={id || generatedId} type="checkbox" role="switch" aria-checked={checked} name={name} checked={checked}
      disabled={disabled} onChange={event => onCheckedChange(event.target.checked)} />
    <span className="selection-switch-track" aria-hidden="true"><span /></span>
    <span>{label}</span>
  </label>;
}

export type RadioGroupProps = {
  label: string; name: string; value: string; onValueChange: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean; variant?: 'stacked' | 'segmented';
};

export function RadioGroup({ label, name, value, onValueChange, options, disabled, variant = 'stacked' }: RadioGroupProps) {
  const id = useId();
  return <fieldset className="selection-group" data-variant={variant} disabled={disabled}>
    <legend>{label}</legend>
    <div className="selection-options">{options.map((option, index) =>
      <label className="selection-option" htmlFor={`${id}-${index}`} key={option.value}>
        <input id={`${id}-${index}`} type="radio" name={name} value={option.value}
          checked={value === option.value} disabled={option.disabled}
          onChange={event => { if (event.target.checked) onValueChange(option.value); }} />
        {variant === 'stacked' && <span className="selection-radio-mark" aria-hidden="true"><Circle size={10} fill="currentColor" strokeWidth={0} /></span>}
        <span>{option.label}</span>
      </label>
    )}</div>
  </fieldset>;
}

export function SegmentedControl(props: Omit<RadioGroupProps, 'variant'>) {
  return <RadioGroup {...props} variant="segmented" />;
}

/** Align visible controls on a shared row, with labels above it. */
export function ControlToolbar({ children }: { children: ReactNode }) {
  return <div className="selection-toolbar">{children}</div>;
}
