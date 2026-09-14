'use client';

import { useEffect, useLayoutEffect, useId, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { Command } from 'cmdk';
import { DayPicker, type ChevronProps, type Matcher } from 'react-day-picker';
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Search, Upload, X } from './icons';
import { Button } from './form-controls';
import { Dialog, Sheet } from './overlay-controls';

export function Avatar({ name, src, size = 32 }: { name: string; src?: string; size?: 24 | 32 | 40 }) {
  const [failedSource, setFailedSource] = useState<string>();
  const initials = name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(part => Array.from(part)[0]).join('').toLocaleUpperCase() || '?';
  // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Initials and a failed-image fallback form one named image.
  return <span className="basic-avatar" role="img" aria-label={name.trim() || 'Unknown person'} style={{ '--avatar-size': `${size}px` } as CSSProperties}>
    {/* oxlint-disable-next-line next/no-img-element -- Portable avatar accepts caller-owned image URLs without Next configuration. */}
    {src && failedSource !== src ? <img src={src} alt="" onError={() => setFailedSource(src)} /> : <span aria-hidden="true">{initials}</span>}
  </span>;
}

export type CommandAction = { id: string; label: string; group?: string; disabled?: boolean; onSelect: () => void };
export function CommandMenu({ label = 'Open commands', commands, open, onOpenChange, triggerRef }: {
  label?: string; commands: CommandAction[]; open?: boolean; onOpenChange?: (open: boolean) => void; triggerRef?: RefObject<HTMLButtonElement | null>;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [keyboardFocus, setKeyboardFocus] = useState(true);
  const input = useRef<HTMLInputElement>(null);
  const pendingCommand = useRef<(() => void) | null>(null);
  const isOpen = open ?? internalOpen;
  useLayoutEffect(() => { if (isOpen) pendingCommand.current = null; }, [isOpen]);
  useEffect(() => () => { pendingCommand.current = null; }, []);
  const groups = [...new Set(commands.map(command => command.group || 'Commands'))];
  function changeOpen(next: boolean) {
    if (next) { pendingCommand.current = null; setKeyboardFocus(Boolean(document.activeElement?.matches(':focus-visible'))); }
    if (open === undefined) setInternalOpen(next);
    if (!next) setQuery('');
    onOpenChange?.(next);
  }
  useEffect(() => {
    if (!isOpen) return;
    const keyboard = (event: KeyboardEvent) => { if (!['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) setKeyboardFocus(true); };
    const pointer = () => setKeyboardFocus(false);
    document.addEventListener('keydown', keyboard, true);
    document.addEventListener('pointerdown', pointer, true);
    return () => { document.removeEventListener('keydown', keyboard, true); document.removeEventListener('pointerdown', pointer, true); };
  }, [isOpen]);
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (wasOpen !== isOpen) { setWasOpen(isOpen); if (!isOpen) setQuery(''); }
  return <Dialog label={label} title="Commands" description="Find an action, then press Enter." open={isOpen} onOpenChange={changeOpen} initialFocus={input} triggerRef={triggerRef} onOpenChangeComplete={next => {
    if (next || isOpen) return;
    const action = pendingCommand.current; pendingCommand.current = null; action?.();
  }}>
    <Command className="basic-command" label="Search commands" loop>
      <div className="basic-command-search" data-keyboard-focus={keyboardFocus ? '' : undefined}><Search size={16} strokeWidth={1.5} aria-hidden="true" /><Command.Input ref={input} value={query} onValueChange={setQuery} placeholder="Search commands" aria-label="Search commands" /></div>
      <Command.List className="basic-command-list">
        <Command.Empty className="basic-command-empty">No commands found.</Command.Empty>
        {groups.map(group => <Command.Group heading={group} key={group}>
          {commands.filter(command => (command.group || 'Commands') === group).map(command => <Command.Item key={command.id} value={command.id} keywords={[command.label, group]} disabled={command.disabled} onSelect={() => {
            if (command.disabled || pendingCommand.current) return;
            pendingCommand.current = command.onSelect;
            changeOpen(false);
          }}>{command.label}</Command.Item>)}
        </Command.Group>)}
      </Command.List>
    </Command>
  </Dialog>;
}

/** Parse calendar dates without UTC conversion or rollover of invalid dates. */
function parseDate(value?: string): Date | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1) return undefined;
  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  date.setHours(12, 0, 0, 0);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : undefined;
}
function formatDate(date: Date) {
  return `${String(date.getFullYear()).padStart(4, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function CalendarChevron({ orientation, className }: ChevronProps) {
  const Icon = orientation === 'left' ? ChevronLeft : orientation === 'up' ? ChevronUp : orientation === 'down' ? ChevronDown : ChevronRight;
  return <Icon className={className} size={16} strokeWidth={1.5} aria-hidden="true" />;
}
export type DatePickerProps = {
  id: string; label: string; value?: string; onValueChange: (value: string | undefined) => void;
  min?: string; max?: string; disabled?: boolean; error?: string;
};
export function DatePicker({ id, label, value, onValueChange, min, max, disabled = false, error }: DatePickerProps) {
  const [draft, setDraft] = useState(value || '');
  const [validation, setValidation] = useState('');
  const [open, setOpen] = useState(false);
  if (disabled && open) setOpen(false);
  const selected = parseDate(value), minimum = parseDate(min), maximum = parseDate(max);
  const invalidBounds = (min && !minimum) || (max && !maximum) || (min && max && min > max);
  const invalidValue = value && (!selected || (min && value < min) || (max && value > max));
  const message = error || validation || (invalidBounds ? 'Check the allowed date range.' : invalidValue ? 'Choose a date within the allowed range.' : '');
  function firstMonth() {
    const today = formatDate(new Date());
    return selected || (minimum && min && today < min ? minimum : maximum && max && today > max ? maximum : new Date());
  }
  const [month, setMonth] = useState(firstMonth);
  const [previousValue, setPreviousValue] = useState(value);
  if (previousValue !== value) { setPreviousValue(value); setDraft(value || ''); setValidation(''); }
  const blocked: Matcher[] = [];
  if (minimum) blocked.push({ before: minimum });
  if (maximum) blocked.push({ after: maximum });
  function commit(raw: string) {
    if (disabled || invalidBounds) return;
    if (!raw) { setValidation(''); onValueChange(undefined); return; }
    if (!parseDate(raw)) { setValidation('Enter a valid date as YYYY-MM-DD.'); return; }
    if (min && raw < min) { setValidation(`Choose ${min} or later.`); return; }
    if (max && raw > max) { setValidation(`Choose ${max} or earlier.`); return; }
    setValidation(''); onValueChange(raw);
  }
  return <div className="basic-field" data-date-picker>
    <label htmlFor={id}>{label}</label>
    <BasePopover.Root open={open} onOpenChange={next => { if (next && (disabled || invalidBounds)) return; if (next) setMonth(firstMonth()); setOpen(next); }}>
      <div className="basic-date-control" data-invalid={message ? '' : undefined}>
        <input id={id} type="text" inputMode="numeric" placeholder="YYYY-MM-DD" value={draft} disabled={disabled || Boolean(invalidBounds)} aria-invalid={Boolean(message)} aria-describedby={`${id}-hint${message ? ` ${id}-error` : ''}`} onChange={event => { setDraft(event.target.value); setValidation(''); }} onBlur={() => commit(draft)} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); commit(draft); } }} />
        <BasePopover.Trigger className="basic-icon-button" aria-label={`Choose ${label.toLowerCase()}`} disabled={disabled || Boolean(invalidBounds)}><CalendarDays size={16} strokeWidth={1.5} aria-hidden="true" /></BasePopover.Trigger>
      </div>
      <BasePopover.Portal><BasePopover.Positioner className="overlay-positioner" sideOffset={8} align="start" collisionPadding={8}>
        <BasePopover.Popup className="overlay-surface basic-calendar-popup" initialFocus={false}>
          <BasePopover.Title className="basic-calendar-title">{label}</BasePopover.Title>
          {/* oxlint-disable-next-line jsx-a11y/no-autofocus -- Focus only after the user explicitly opens this keyboard calendar. */}
          <DayPicker className="basic-calendar" mode="single" selected={selected} month={month} onMonthChange={setMonth} autoFocus disabled={blocked} startMonth={minimum} endMonth={maximum} components={{ Chevron: CalendarChevron }} labels={{ labelPrevious: () => 'Previous month', labelNext: () => 'Next month' }} onSelect={date => {
            if (date) { const next = formatDate(date); setDraft(next); commit(next); setOpen(false); }
          }} />
          <div className="basic-calendar-actions"><Button variant="secondary" onClick={() => { setDraft(''); commit(''); setOpen(false); }}>Clear date</Button><BasePopover.Close className="overlay-trigger">Close</BasePopover.Close></div>
        </BasePopover.Popup>
      </BasePopover.Positioner></BasePopover.Portal>
    </BasePopover.Root>
    <p className="basic-hint" id={`${id}-hint`}>YYYY-MM-DD{min && max ? ` · ${min} to ${max}` : min ? ` · From ${min}` : max ? ` · Until ${max}` : ''}</p>
    {message && <p className="basic-error" id={`${id}-error`} role="alert">{message}</p>}
  </div>;
}

function matchesAccept(file: File, accept?: string) {
  const rules = accept?.split(',').map(rule => rule.trim().toLowerCase()).filter(Boolean) || [];
  return !rules.length || rules.some(rule => rule.startsWith('.') ? file.name.toLowerCase().endsWith(rule) : rule.endsWith('/*') ? file.type.toLowerCase().startsWith(rule.slice(0, -1)) : file.type.toLowerCase() === rule);
}
export type FileUploadProps = {
  id: string; label: string; accept?: string; multiple?: boolean; maxBytes?: number; disabled?: boolean;
  onFilesChange: (files: File[]) => void;
};
export function FileUpload({ id, label, accept, multiple = false, maxBytes, disabled = false, onFilesChange }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [selectionChanged, setSelectionChanged] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();
  function update(next: File[]) { setFiles(next); setSelectionChanged(true); onFilesChange(next); }
  function receive(incoming: File[]) {
    if (disabled || !incoming.length) return;
    if (!multiple && incoming.length > 1) { setErrors(['Choose one file.']); return; }
    const rejected: string[] = [], valid: File[] = [];
    for (const file of incoming) {
      if (!matchesAccept(file, accept)) rejected.push(`${file.name}: this file type is not allowed.`);
      else if (maxBytes !== undefined && (!Number.isFinite(maxBytes) || maxBytes < 0 || file.size > maxBytes)) rejected.push(`${file.name}: exceeds the size limit.`);
      else valid.push(file);
    }
    setErrors(rejected);
    if (valid.length) {
      const candidates = multiple ? [...files, ...valid] : valid;
      update(candidates.filter((file, index) => candidates.findIndex(other => other.name === file.name && other.size === file.size && other.lastModified === file.lastModified) === index));
    }
  }
  return <div className="basic-field" data-file-upload>
    <span id={`${id}-label`}>{label}</span>
    <div className="basic-dropzone" data-dragging={dragging ? '' : undefined} data-disabled={disabled ? '' : undefined} onDragOver={event => { event.preventDefault(); if (!disabled) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); receive(Array.from(event.dataTransfer.files)); }}>
      <Upload size={16} strokeWidth={1.5} aria-hidden="true" /><span>{multiple ? 'Choose files or drop them here' : 'Choose a file or drop it here'}</span>
      <input ref={input} type="file" id={id} accept={accept} multiple={multiple} disabled={disabled} aria-labelledby={`${id}-label`} aria-describedby={`${id}-hint${errors.length ? ` ${id}-error` : ''}`} aria-controls={listId} aria-invalid={Boolean(errors.length)} onChange={event => { receive(Array.from(event.currentTarget.files || [])); event.currentTarget.value = ''; }} />
    </div>
    <p className="basic-hint" id={`${id}-hint`}>{accept || 'Any file type'}{maxBytes !== undefined && ` · Up to ${Math.round(maxBytes / 1024)} KB per file`}.</p>
    {errors.length > 0 && <ul className="basic-errors" id={`${id}-error`} role="alert">{errors.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul>}
    <ul className="basic-file-list" id={listId}>{files.map((file, index) => <li key={`${file.name}-${file.lastModified}-${index}`}><span>{file.name}</span><button className="basic-icon-button" type="button" aria-label={`Remove ${file.name}`} disabled={disabled} onClick={() => { update(files.filter((_, position) => position !== index)); setErrors([]); }}><X size={16} strokeWidth={1.5} aria-hidden="true" /></button></li>)}</ul>
    <output className="basic-hint basic-selection-status" aria-live="polite">{selectionChanged ? (files.length ? `${files.length} ${files.length === 1 ? 'file' : 'files'} selected.` : 'No files selected.') : ''}</output>
  </div>;
}

export function BasicExtensionPreview({ id }: { id: string }) { return <BasicExample key={id} id={id} />; }
function BasicExample({ id }: { id: string }) {
  const prefix = useId();
  const [result, setResult] = useState('No action selected.');
  const commandTrigger = useRef<HTMLButtonElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [date, setDate] = useState<string | undefined>('2026-09-15');
  return <div className="basic-extension-example" data-basic-extension={id}>
    {id === 'avatar' && <>
      <div className="basic-avatar-row"><Avatar name="Alex Morgan" /><span>Alex Morgan</span></div>
      <div className="basic-avatar-row"><Avatar name="Alex Morgan" size={24} /><Avatar name="Sam Lee" size={32} /><Avatar name="Jordan Rivera" size={40} /><span>Design team</span></div>
      <div className="basic-avatar-row"><Avatar name="Alex Morgan" src="data:image/png;base64,invalid" /><span>Alex Morgan</span></div>
    </>}
    {id === 'command-menu' && <>
      <CommandMenu triggerRef={commandTrigger} commands={[
        { id: 'copy', label: 'Copy page link', group: 'Page', onSelect: () => setResult('Copy page link selected. Nothing copied.') },
        { id: 'archive', label: 'Archive page', group: 'Page', disabled: true, onSelect: () => setResult('Archive selected.') },
        { id: 'settings', label: 'Open settings', group: 'Workspace', onSelect: () => setSettingsOpen(true) },
      ]} />
      <Sheet label="Reading settings" title="Reading settings" description="Choose what appears while you read." open={settingsOpen} onOpenChange={setSettingsOpen} trigger={false} finalFocus={commandTrigger}><p>Your reading preferences stay in this example.</p></Sheet>
      <output aria-live="polite">{result}</output>
    </>}
    {id === 'date-picker' && <>
      <DatePicker id={`${prefix}-review`} label="Review date" value={date} onValueChange={setDate} min="2026-09-10" max="2026-10-20" />
      <output aria-live="polite">{date ? `Selected: ${date}` : 'No date selected.'}</output>
      <DatePicker id={`${prefix}-unavailable`} label="Unavailable date" value="2026-09-15" onValueChange={() => {}} disabled />
      <DatePicker id={`${prefix}-error`} label="Project start date" value="2026-09-15" onValueChange={() => {}} error="Choose a date after the project starts." />
    </>}
    {id === 'file-upload' && <>
      <FileUpload id={`${prefix}-files`} label="Attachments" multiple accept=".png,.jpg,.pdf" maxBytes={1048576} onFilesChange={() => {}} />
      <output>Nothing uploaded.</output>
      <FileUpload id={`${prefix}-disabled`} label="Unavailable attachments" disabled onFilesChange={() => {}} />
    </>}
  </div>;
}
