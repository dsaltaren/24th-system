import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, Ref, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Check, ChevronDown, LoaderCircle } from './icons';

type FieldProps = { id: string; label: string; hint?: string; error?: string };
type InputProps = FieldProps & InputHTMLAttributes<HTMLInputElement>;

function describedBy(id: string, hint?: string, error?: string, supplied?: string) {
  return [supplied, hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
}

function Field({ id, label, hint, error, required, children }: FieldProps & { required?: boolean; children: ReactNode }) {
  return <div className="form-field">
    <label className="form-field-label" htmlFor={id}>{label}{required && <span className="form-required"> (required)</span>}</label>
    {children}
    <FieldHelp id={id} hint={hint} error={error} />
  </div>;
}

function FieldHelp({ id, hint, error }: Pick<FieldProps, 'id' | 'hint' | 'error'>) {
  return <>
    {hint && <p className="form-field-hint" id={`${id}-hint`}>{hint}</p>}
    {error && <p className="form-field-error" id={`${id}-error`}>{error}</p>}
  </>;
}

export function Button({ variant = 'primary', size = 'regular', type = 'button', className = '', loading = false, fullWidth = false, disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary'; size?: 'regular' | 'field'; loading?: boolean; fullWidth?: boolean; ref?: Ref<HTMLButtonElement> }) {
  return <button {...props} type={type} disabled={disabled || loading} aria-busy={loading || undefined} data-loading={loading || undefined} data-full-width={fullWidth || undefined} className={`form-button ${className}`} data-variant={variant} data-size={size}>
    <span className="button-label">{children}</span>{loading && <LoaderCircle className="button-spinner" size={14} strokeWidth={1.5} aria-hidden="true" />}
  </button>;
}

export function TextField({ id, label, hint, error, className = '', ...props }: InputProps) {
  return <Field {...{ id, label, hint, error }} required={props.required}>
    <input {...props} id={id} className={`form-input ${className}`} aria-invalid={error ? true : props['aria-invalid']}
      aria-describedby={describedBy(id, hint, error, props['aria-describedby'])} />
  </Field>;
}

export function TextArea({ id, label, hint, error, className = '', ...props }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <Field {...{ id, label, hint, error }} required={props.required}>
    <textarea {...props} id={id} className={`form-input form-textarea ${className}`} aria-invalid={error ? true : props['aria-invalid']}
      aria-describedby={describedBy(id, hint, error, props['aria-describedby'])} />
  </Field>;
}

export function SelectField({ id, label, hint, error, className = '', ...props }: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return <Field {...{ id, label, hint, error }} required={props.required}>
    <span className="form-select">
      <select {...props} id={id} className={`form-input ${className}`} aria-invalid={error ? true : props['aria-invalid']}
        aria-describedby={describedBy(id, hint, error, props['aria-describedby'])} />
      <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" />
    </span>
  </Field>;
}

export function Checkbox({ id, label, hint, error, className = '', ...props }: Omit<InputProps, 'type'>) {
  return <div className="form-field">
    <label className="form-checkbox-label" htmlFor={id}>
      <input {...props} type="checkbox" id={id} className={`form-checkbox ${className}`} aria-invalid={error ? true : props['aria-invalid']}
        aria-describedby={describedBy(id, hint, error, props['aria-describedby'])} />
      <span className="form-checkbox-mark" aria-hidden="true"><Check size={14} strokeWidth={2} /></span>
      <span>{label}{props.required && <span className="form-required"> (required)</span>}</span>
    </label>
    <FieldHelp id={id} hint={hint} error={error} />
  </div>;
}

export function FormMessage({ status, children }: { status: 'success' | 'error'; children: ReactNode }) {
  return <p className="form-message" data-status={status} role={status === 'error' ? 'alert' : 'status'}>{children}</p>;
}
