'use client';

import { useEffect, useId, useRef, useState, type ComponentProps } from 'react';
import { Accordion, DataTable, Pagination, type TableColumn } from './content-controls';
import { Button, Checkbox, FormMessage, SelectField, TextField } from './form-controls';
import { SearchField } from './input-extensions';
import { Dialog } from './overlay-controls';
import { EmptyState } from './feedback-controls';

export type TableFilter<Row> = { label: string; options: { value: string; label: string }[]; getValue: (row: Row) => string };
export type FilteredTableProps<Row> = {
  caption: string; rows: Row[]; columns: TableColumn<Row>[]; rowKey: (row: Row) => string;
  searchText: (row: Row) => string; searchLabel?: string; filter?: TableFilter<Row>; pageSize?: number;
};
export function FilteredTable<Row>({ caption, rows, columns, rowKey, searchText, searchLabel = 'Search records', filter, pageSize = 10 }: FilteredTableProps<Row>) {
  const id = useId();
  const [query, setQuery] = useState(''), [selected, setSelected] = useState(''), [page, setPage] = useState(1);
  const matches = rows.filter(row => searchText(row).toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()) && (!filter || !selected || filter.getValue(row) === selected));
  const size = Math.max(1, Math.floor(pageSize) || 10), count = Math.max(1, Math.ceil(matches.length / size)), current = Math.min(page, count);
  const reset = () => { setQuery(''); setSelected(''); setPage(1); };
  return <section className="product-pattern filtered-table" aria-label={caption}>
    <div className="product-pattern-toolbar">
      <SearchField id={`${id}-search`} label={searchLabel} value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} />
      {filter && <SelectField id={`${id}-filter`} label={filter.label} value={selected} onChange={event => { setSelected(event.target.value); setPage(1); }}><option value="">All</option>{filter.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</SelectField>}
      <Button variant="secondary" size="field" onClick={reset} disabled={!query && !selected}>Reset filters</Button>
    </div>
    <output className="product-pattern-count">{matches.length} {matches.length === 1 ? 'result' : 'results'}</output>
    {matches.length ? <DataTable caption={caption} columns={columns} rows={matches.slice((current - 1) * size, current * size)} rowKey={rowKey} /> : <EmptyState title="No matching records" description="Clear the search or reset the filters." />}
    {count > 1 && <Pagination size="compact" page={current} pageCount={count} onPageChange={setPage} label={`${caption} pages`} />}
  </section>;
}

export type FormValues = Record<string, string>;
export type FormErrors = Record<string, string | undefined>;
export type ValidatedField = Pick<ComponentProps<typeof TextField>, 'label' | 'hint' | 'type' | 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'autoComplete'> & { name: string };
export type ValidatedFormProps = {
  label: string; fields: ValidatedField[]; initialValues?: FormValues; validate?: (values: FormValues) => FormErrors;
  onSubmit: (values: FormValues) => void | Promise<void>; submitLabel?: string; successMessage?: string;
};
const failureMessage = (error: unknown) => error instanceof Error && error.message ? error.message : 'Something went wrong. Try again.';
export function ValidatedForm({ label, fields, initialValues = {}, validate, onSubmit, submitLabel = 'Save changes', successMessage = 'Changes saved.' }: ValidatedFormProps) {
  const id = useId(), form = useRef<HTMLFormElement>(null), busy = useRef(false), mounted = useRef(true);
  const [values, setValues] = useState<FormValues>(() => Object.fromEntries(fields.map(field => [field.name, initialValues[field.name] ?? ''])));
  const [errors, setErrors] = useState<FormErrors>({}), [pending, setPending] = useState(false), [message, setMessage] = useState<{ status: 'success' | 'error'; text: string } | null>(null);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  return <form ref={form} className="product-pattern product-pattern-form" aria-label={label} aria-busy={pending || undefined} noValidate onSubmit={async event => {
    event.preventDefault(); if (busy.current) return;
    const next: FormErrors = {};
    const inputs = Array.from(form.current?.querySelectorAll<HTMLInputElement>('input[name]') ?? []);
    inputs.forEach(input => { if (!input.validity.valid) next[input.name] = input.validationMessage; });
    try { Object.entries(validate?.({ ...values }) ?? {}).forEach(([name, error]) => { if (error) next[name] = error; }); } catch (error) { setMessage({ status: 'error', text: failureMessage(error) }); return; }
    setErrors(next); setMessage(null);
    const invalid = inputs.find(input => next[input.name]);
    if (Object.values(next).some(Boolean)) { invalid?.focus(); return; }
    busy.current = true; setPending(true);
    try { await onSubmit({ ...values }); if (mounted.current) setMessage({ status: 'success', text: successMessage }); }
    catch (error) { if (mounted.current) setMessage({ status: 'error', text: failureMessage(error) }); }
    finally { busy.current = false; if (mounted.current) setPending(false); }
  }}>
    {fields.map((field, index) => <TextField {...field} key={field.name} id={`${id}-field-${index}`} value={values[field.name] ?? ''} error={errors[field.name]} readOnly={pending} onChange={event => { setValues(previous => ({ ...previous, [field.name]: event.target.value })); setErrors(previous => ({ ...previous, [field.name]: undefined })); setMessage(null); }} />)}
    {message && <FormMessage status={message.status}>{message.text}</FormMessage>}
    <Button type="submit" loading={pending}>{submitLabel}</Button>
  </form>;
}

export type ConfirmActionProps = {
  trigger: string; title: string; description: string; onConfirm: () => void | Promise<void>;
  confirmLabel?: string; confirmationText?: string;
};
export function ConfirmAction({ trigger, title, description, onConfirm, confirmLabel = 'Confirm action', confirmationText }: ConfirmActionProps) {
  const id = useId(), cancel = useRef<HTMLButtonElement>(null), busy = useRef(false), mounted = useRef(true);
  const [open, setOpen] = useState(false), [pending, setPending] = useState(false), [typed, setTyped] = useState(''), [error, setError] = useState('');
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const changeOpen = (next: boolean) => { if (busy.current) return; setOpen(next); if (next) { setTyped(''); setError(''); } };
  return <Dialog label={trigger} title={title} description={description} open={open} onOpenChange={changeOpen} initialFocus={cancel} dismissible={!pending}>
    <div className="product-pattern">
      {confirmationText && <TextField id={`${id}-confirm`} label={`Type ${confirmationText} to confirm`} value={typed} readOnly={pending} autoComplete="off" onChange={event => setTyped(event.target.value)} />}
      {error && <FormMessage status="error">{error}</FormMessage>}
      <div className="product-pattern-actions">
        <Button ref={cancel} variant="secondary" disabled={pending} onClick={() => changeOpen(false)}>Cancel</Button>
        <Button loading={pending} disabled={Boolean(confirmationText && typed !== confirmationText)} onClick={async () => {
          if (busy.current || (confirmationText && typed !== confirmationText)) return;
          busy.current = true; setPending(true); setError('');
          try { await onConfirm(); if (mounted.current) setOpen(false); }
          catch (failure) { if (mounted.current) setError(failureMessage(failure)); }
          finally { busy.current = false; if (mounted.current) setPending(false); }
        }}>{confirmLabel}</Button>
      </div>
    </div>
  </Dialog>;
}

const waitForExample = () => new Promise<void>(resolve => setTimeout(resolve, 600));
const exampleRows = [
  { id: '1', name: '24th', status: 'Published' }, { id: '2', name: 'Team handbook', status: 'Draft' },
  { id: '3', name: 'Research notes', status: 'Draft' }, { id: '4', name: 'Project archive', status: 'Published' },
];
export function FilteredTableExample() {
  return <FilteredTable caption="Projects" rows={exampleRows} rowKey={row => row.id} searchText={row => row.name} pageSize={2}
    filter={{ label: 'Status', options: [{ value: 'Draft', label: 'Draft' }, { value: 'Published', label: 'Published' }], getValue: row => row.status }}
    columns={[{ key: 'name', header: 'Project', render: row => row.name }, { key: 'status', header: 'Status', render: row => row.status }]} />;
}
export function ValidatedFormExample() {
  const id = useId(), [fail, setFail] = useState(false), [attempts, setAttempts] = useState(0);
  return <div className="product-pattern">
    <Checkbox id={`${id}-failure`} label="Simulate a failed save" checked={fail} onChange={event => setFail(event.target.checked)} />
    <ValidatedForm label="Profile" fields={[{ name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }]} validate={values => values.name.trim().length < 2 ? { name: 'Use at least two characters.' } : {}} onSubmit={async () => { setAttempts(value => value + 1); await waitForExample(); if (fail) throw new Error('Could not save. Your entries are still here.'); }} successMessage="Saved in this example. Nothing was sent." />
    <p className="product-pattern-count">Save attempts: {attempts}</p>
    <Accordion items={[{ id: 'second-form', title: 'Another profile', content: <ValidatedForm label="Second profile" fields={[{ name: 'name', label: 'Name', required: true }]} onSubmit={() => {}} successMessage="Profile checked. Nothing was sent." /> }]} />
  </div>;
}
export function ConfirmActionExample() {
  const id = useId(), [fail, setFail] = useState(false), [attempts, setAttempts] = useState(0);
  return <div className="product-pattern">
    <Checkbox id={`${id}-failure`} label="Simulate a failed action" checked={fail} onChange={event => setFail(event.target.checked)} />
    <ConfirmAction trigger="Delete example" title="Delete this example?" description="This demonstration keeps all data. Nothing is actually deleted." confirmationText="DELETE" confirmLabel="Delete example" onConfirm={async () => { setAttempts(value => value + 1); await waitForExample(); if (fail) throw new Error('Could not complete the action. Try again.'); }} />
    <ConfirmAction trigger="Archive example" title="Archive this example?" description="Archived items can be restored later. Nothing is changed in this preview." confirmLabel="Archive example" onConfirm={() => setAttempts(value => value + 1)} />
    <output className="product-pattern-count">Confirmed attempts: {attempts}. Nothing was deleted.</output>
  </div>;
}
export function ProductPatternPreview({ id }: { id: string }) {
  return <div data-product-pattern={id}>{id === 'filtered-table' ? <FilteredTableExample /> : id === 'validated-form' ? <ValidatedFormExample /> : id === 'confirm-action' ? <ConfirmActionExample /> : null}</div>;
}
