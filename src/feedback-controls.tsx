'use client';

import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import { CircleCheck, CircleAlert, Info, LoaderCircle, X } from './icons';
import { Button } from './form-controls';

export type FeedbackTone = 'info' | 'success' | 'error';
const toneIcons = { info: Info, success: CircleCheck, error: CircleAlert };

export function Alert({ tone = 'info', title, children }: { tone?: FeedbackTone; title?: string; children: ReactNode }) {
  const Icon = toneIcons[tone];
  return <div className="feedback-alert" data-tone={tone} role={tone === 'error' ? 'alert' : 'status'}>
    <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
    <div>{title && <p className="feedback-title">{title}</p>}<div>{children}</div></div>
  </div>;
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="feedback-empty"><p className="feedback-title">{title}</p>
    {description && <p className="feedback-description">{description}</p>}{action && <div>{action}</div>}</div>;
}

export function Spinner({ label = 'Loading' }: { label?: string }) {
  return <output className="feedback-spinner" aria-label={label}>
    <LoaderCircle size={16} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></output>;
}

export function Skeleton({ width = '100%', height = 20 }: { width?: CSSProperties['width']; height?: CSSProperties['height'] }) {
  return <div className="feedback-skeleton" aria-hidden="true" style={{ width, height }} />;
}

export function Progress({ label, value, max = 100, valueLabel }: { label: string; value?: number; max?: number; valueLabel?: string }) {
  const id = useId();
  const safeMax = Math.max(1, max);
  const text = valueLabel ?? (value === undefined ? 'In progress' : `${Math.round(Math.min(1, Math.max(0, value / safeMax)) * 100)}%`);
  return <div className="feedback-progress"><div><label htmlFor={id}>{label}</label><span aria-hidden="true">{text}</span></div>
    <progress id={id} value={value} max={safeMax} aria-valuetext={text} /></div>;
}

export type ToastOptions = { title: string; description?: string; tone?: FeedbackTone; timeout?: number };

export function useToast() {
  const manager = ToastPrimitive.useToastManager();
  return {
    show: ({ title, description, tone = 'info', timeout }: ToastOptions) => manager.add({ title, description, type: tone, timeout, priority: tone === 'error' ? 'high' : 'low' }),
    dismiss: manager.close,
  };
}

function ToastMessages() {
  const { toasts } = ToastPrimitive.useToastManager();
  return <ToastPrimitive.Portal><ToastPrimitive.Viewport className="feedback-toast-viewport" aria-label="Notifications">
    {toasts.map(toast => {
      const tone = toast.type === 'success' || toast.type === 'error' ? toast.type : 'info';
      const Icon = toneIcons[tone];
      return <ToastPrimitive.Root key={toast.id} toast={toast} className="feedback-toast" data-tone={tone} swipeDirection={[]}>
        <ToastPrimitive.Content className="feedback-toast-content"><Icon size={16} strokeWidth={1.5} aria-hidden="true" />
          <div><ToastPrimitive.Title className="feedback-title" />{toast.description && <ToastPrimitive.Description className="feedback-description" />}</div>
        </ToastPrimitive.Content>
        <ToastPrimitive.Close className="feedback-toast-close" aria-label="Dismiss notification"><X size={16} strokeWidth={1.5} aria-hidden="true" /></ToastPrimitive.Close>
      </ToastPrimitive.Root>;
    })}
  </ToastPrimitive.Viewport></ToastPrimitive.Portal>;
}

export function ToastProvider({ children, timeout = 5000, limit = 3 }: { children: ReactNode; timeout?: number; limit?: number }) {
  return <ToastPrimitive.Provider timeout={timeout} limit={limit}>{children}<ToastMessages /></ToastPrimitive.Provider>;
}

function ToastExample() {
  const toast = useToast();
  return <div className="feedback-example-actions"><Button onClick={() => toast.show({ title: 'Changes saved.', tone: 'success' })}>Show toast</Button>
    <Button variant="secondary" onClick={() => toast.show({ title: 'Could not save.', description: 'Try again.', tone: 'error', timeout: 0 })}>Show error</Button></div>;
}

function ProgressExample() {
  const [value, setValue] = useState(40);
  return <div className="feedback-example"><Progress label="Upload" value={value} />
    <div><Button onClick={() => setValue(current => Math.min(100, current + 20))} disabled={value === 100}>Advance</Button></div></div>;
}

function EmptyExample() {
  const [added, setAdded] = useState(false);
  return added
    ? <div className="feedback-example"><p>Untitled item</p><Button variant="secondary" onClick={() => setAdded(false)}>Remove item</Button></div>
    : <EmptyState title="No items yet." description="Add an item to get started." action={<Button onClick={() => setAdded(true)}>Add item</Button>} />;
}

export function FeedbackPreview({ id }: { id: string }) {
  if (id === 'alert') return <div className="feedback-example"><Alert tone="info">Your changes stay on this device.</Alert><Alert tone="success">Changes saved.</Alert><Alert tone="error">Could not save. Try again.</Alert></div>;
  if (id === 'toast') return <ToastProvider><ToastExample /></ToastProvider>;
  if (id === 'empty') return <EmptyExample />;
  if (id === 'spinner') return <div className="feedback-example"><Spinner label="Loading items" /></div>;
  if (id === 'skeleton') return <div className="feedback-example" aria-busy="true" aria-label="Loading preview"><Skeleton height={80} /><Skeleton width="70%" /><Skeleton width="45%" /></div>;
  if (id === 'progress') return <ProgressExample />;
  return null;
}
