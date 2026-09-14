'use client';

import { useId, useRef, useState, type RefObject } from 'react';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { Check, ChevronDown, X } from './icons';

export type ComboboxOption = { value: string; label: string; disabled?: boolean };
type SharedProps = { label: string; options: ComboboxOption[]; disabled?: boolean; placeholder?: string; name?: string };
const sameOption = (item: ComboboxOption, value: ComboboxOption) => item.value === value.value;

function OptionsPopup({ anchor }: { anchor: RefObject<HTMLDivElement | null> }) {
  return <BaseCombobox.Portal><BaseCombobox.Positioner className="combobox-positioner" anchor={anchor} sideOffset={4} collisionPadding={8}>
    <BaseCombobox.Popup className="combobox-popup">
      <BaseCombobox.Empty className="combobox-empty">No matches found.</BaseCombobox.Empty>
      <BaseCombobox.List className="combobox-list">{(option: ComboboxOption) => <BaseCombobox.Item className="combobox-option" key={option.value} value={option} disabled={option.disabled}>
        <span>{option.label}</span><BaseCombobox.ItemIndicator className="combobox-option-mark"><Check size={16} strokeWidth={1.5} aria-hidden="true" /></BaseCombobox.ItemIndicator>
      </BaseCombobox.Item>}</BaseCombobox.List>
    </BaseCombobox.Popup>
  </BaseCombobox.Positioner></BaseCombobox.Portal>;
}

export function Combobox({ label, options, value, onValueChange, disabled = false, placeholder = 'Search options', name }: SharedProps & {
  value: string | null; onValueChange: (value: string | null) => void;
}) {
  const id = useId();
  const anchor = useRef<HTMLDivElement>(null);
  return <div className="combobox-field">
    <BaseCombobox.Root items={options} value={options.find(option => option.value === value) ?? null} onValueChange={(option, details) => {
      if (details.reason === 'escape-key') { details.cancel(); return; }
      onValueChange(option?.value ?? null);
    }} onInputValueChange={(_, details) => { if (details.reason === 'escape-key') details.cancel(); }}
      isItemEqualToValue={sameOption} disabled={disabled} name={name}>
      <label className="combobox-label" htmlFor={id}>{label}</label>
      <BaseCombobox.InputGroup className="combobox-control" ref={anchor}>
        <BaseCombobox.Input className="combobox-input" id={id} placeholder={placeholder} />
        <BaseCombobox.Clear className="combobox-icon-button" aria-label={`Clear ${label}`}><X size={16} strokeWidth={1.5} aria-hidden="true" /></BaseCombobox.Clear>
        <BaseCombobox.Trigger className="combobox-icon-button" aria-label={`Show ${label} options`}><ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" /></BaseCombobox.Trigger>
      </BaseCombobox.InputGroup>
      <OptionsPopup anchor={anchor} />
    </BaseCombobox.Root>
  </div>;
}

export function MultiSelect({ label, options, value, onValueChange, disabled = false, placeholder = 'Search options', name }: SharedProps & {
  value: string[]; onValueChange: (value: string[]) => void;
}) {
  const id = useId();
  const anchor = useRef<HTMLDivElement>(null);
  const selected = value.flatMap(item => { const option = options.find(option => option.value === item); return option ? [option] : []; });
  return <div className="combobox-field">
    <BaseCombobox.Root multiple items={options} value={selected} onValueChange={(items, details) => {
      if (details.reason === 'escape-key') { details.cancel(); return; }
      onValueChange(items.map(item => item.value));
    }} onInputValueChange={(_, details) => { if (details.reason === 'escape-key') details.cancel(); }}
      isItemEqualToValue={sameOption} disabled={disabled} name={name}>
      <label className="combobox-label" htmlFor={id}>{label}</label>
      <BaseCombobox.InputGroup className="combobox-control combobox-control-multiple" ref={anchor}>
        <BaseCombobox.Chips className="combobox-chips">
          <BaseCombobox.Value>{(items: ComboboxOption[]) => items.map(item => <BaseCombobox.Chip className="combobox-chip" key={item.value}>
            <span>{item.label}</span><BaseCombobox.ChipRemove className="combobox-chip-remove" aria-label={`Remove ${item.label}`}><X size={16} strokeWidth={1.5} aria-hidden="true" /></BaseCombobox.ChipRemove>
          </BaseCombobox.Chip>)}</BaseCombobox.Value>
          <BaseCombobox.Input className="combobox-input" id={id} placeholder={placeholder} />
        </BaseCombobox.Chips>
        <BaseCombobox.Trigger className="combobox-icon-button" aria-label={`Show ${label} options`}><ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" /></BaseCombobox.Trigger>
      </BaseCombobox.InputGroup>
      <OptionsPopup anchor={anchor} />
    </BaseCombobox.Root>
  </div>;
}

const previewOptions: ComboboxOption[] = [
  { value: 'design', label: 'Design' }, { value: 'engineering', label: 'Engineering' },
  { value: 'research', label: 'Research' }, { value: 'operations', label: 'Operations', disabled: true },
];
export function ComboboxPreview({ id }: { id: string }) {
  const [single, setSingle] = useState<string | null>(null);
  const [multiple, setMultiple] = useState<string[]>(['design']);
  return <div className="combobox-example" data-combobox-example={id}>
    {id === 'combobox' ? <>
      <Combobox label="Discipline" options={previewOptions} value={single} onValueChange={setSingle} />
      <p aria-live="polite">{single ? `Selected: ${previewOptions.find(option => option.value === single)?.label}.` : ''}</p>
      <Combobox label="Unavailable discipline" options={previewOptions} value="design" onValueChange={() => {}} disabled />
    </> : <>
      <MultiSelect label="Disciplines" options={previewOptions} value={multiple} onValueChange={setMultiple} />
      <p aria-live="polite">{multiple.length} selected.</p>
      <MultiSelect label="Unavailable disciplines" options={previewOptions} value={['design']} onValueChange={() => {}} disabled />
    </>}
  </div>;
}
