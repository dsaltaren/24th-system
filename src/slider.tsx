'use client';

import { useId, type CSSProperties, type ComponentProps } from 'react';

export type SliderProps = Omit<ComponentProps<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange'> & {
  label: string; value: number; onValueChange: (value: number) => void; valueLabel?: string;
};

export function Slider({ label, value, onValueChange, valueLabel, id, min = 0, max = 100, className = '', style, ...props }: SliderProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const range = Number(max) - Number(min);
  const progress = range > 0 ? Math.max(0, Math.min(100, (value - Number(min)) / range * 100)) : 0;
  return <div className="reading-slider">
    <div className="reading-slider-heading"><label htmlFor={inputId}>{label}</label>
      <output htmlFor={inputId} aria-hidden="true">{valueLabel ?? value}</output></div>
    <input {...props} id={inputId} type="range" min={min} max={max} value={value}
      className={`reading-slider-input ${className}`} aria-valuetext={valueLabel ?? props['aria-valuetext']}
      style={{ ...style, '--slider-progress': `${progress}%` } as CSSProperties}
      onChange={event => onValueChange(Number(event.target.value))} />
  </div>;
}
