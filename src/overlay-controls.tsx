'use client';

import { useId, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { Checkbox } from './form-controls';
import { motionTimings } from './motion-presets';
import { SurfaceHeader } from './surface-header';
import { ChevronDown, X } from './icons';

export type MenuAction = { id: string; label: string; onSelect: () => void; disabled?: boolean };
export function Menu({ label, items, disabled = false }: { label: string; items: MenuAction[]; disabled?: boolean }) {
  return <BaseMenu.Root><BaseMenu.Trigger className="overlay-trigger" disabled={disabled}>{label}<ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" /></BaseMenu.Trigger>
    <BaseMenu.Portal><BaseMenu.Positioner className="overlay-positioner" sideOffset={8} align="start"><BaseMenu.Popup className="overlay-surface overlay-menu">
      {items.map(item => <BaseMenu.Item className="overlay-menu-item" key={item.id} disabled={item.disabled} onClick={item.onSelect}>{item.label}</BaseMenu.Item>)}
    </BaseMenu.Popup></BaseMenu.Positioner></BaseMenu.Portal>
  </BaseMenu.Root>;
}

export function Tooltip({ label, content, children, onClick }: { label: string; content: string; children?: ReactNode; onClick?: () => void }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return <BaseTooltip.Provider><BaseTooltip.Root open={open} onOpenChange={setOpen}><BaseTooltip.Trigger className="overlay-trigger" aria-label={label} aria-describedby={open ? id : undefined} onClick={onClick} delay={400}>{children ?? label}</BaseTooltip.Trigger>
    <BaseTooltip.Portal><BaseTooltip.Positioner className="overlay-positioner" sideOffset={8}><BaseTooltip.Popup id={id} role="tooltip" className="overlay-surface overlay-tooltip">{content}</BaseTooltip.Popup></BaseTooltip.Positioner></BaseTooltip.Portal>
  </BaseTooltip.Root></BaseTooltip.Provider>;
}

export type PopoverProps = { label: string; title: string; children: ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void };
export function Popover({ label, title, children, open, onOpenChange }: PopoverProps) {
  return <BasePopover.Root open={open} onOpenChange={onOpenChange}><BasePopover.Trigger className="overlay-trigger">{label}</BasePopover.Trigger>
    <BasePopover.Portal><BasePopover.Positioner className="overlay-positioner" sideOffset={8} align="start"><BasePopover.Popup className="overlay-surface overlay-popover">
      <SurfaceHeader className="overlay-heading"><BasePopover.Title className="overlay-title">{title}</BasePopover.Title><BasePopover.Close className="overlay-close" aria-label="Close popover"><X size={16} strokeWidth={1.5} aria-hidden="true" /></BasePopover.Close></SurfaceHeader>
      <div className="overlay-content overlay-body">{children}</div>
    </BasePopover.Popup></BasePopover.Positioner></BasePopover.Portal>
  </BasePopover.Root>;
}

export type DialogProps = { label: string; title: string; description: string; children?: ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void; initialFocus?: RefObject<HTMLElement | null>; finalFocus?: RefObject<HTMLElement | null>; triggerRef?: RefObject<HTMLButtonElement | null>; trigger?: boolean; onOpenChangeComplete?: (open: boolean) => void; dismissible?: boolean };
function ModalSurface({ label, title, description, children, open, onOpenChange, sheet, initialFocus, finalFocus, triggerRef, trigger = true, onOpenChangeComplete, dismissible = true }: DialogProps & { sheet: boolean }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  return <BaseDialog.Root open={open} onOpenChangeComplete={onOpenChangeComplete} onOpenChange={(next, details) => { if (!next && !dismissible) { details.cancel(); return; } onOpenChange?.(next); }}>
    {trigger && <BaseDialog.Trigger ref={triggerRef} className="overlay-trigger">{label}</BaseDialog.Trigger>}
    <BaseDialog.Portal><BaseDialog.Backdrop className="overlay-backdrop" /><BaseDialog.Popup className={`overlay-surface overlay-modal ${sheet ? 'overlay-sheet' : 'overlay-dialog'}`} style={{
      '--motion-mobile-open': `${motionTimings.mobile.open.duration}ms`,
      '--motion-mobile-close': `${motionTimings.mobile.close.duration}ms`,
      '--ease-mobile-open': motionTimings.mobile.open.easing,
      '--ease-mobile-close': motionTimings.mobile.close.easing,
    } as CSSProperties} initialFocus={initialFocus ?? closeRef} finalFocus={finalFocus}>
      <SurfaceHeader standard className="overlay-heading"><BaseDialog.Title className="overlay-title">{title}</BaseDialog.Title><BaseDialog.Close ref={closeRef} disabled={!dismissible} className="overlay-close" aria-label={sheet ? 'Close sheet' : 'Close dialog'}><X size={16} strokeWidth={1.5} aria-hidden="true" /></BaseDialog.Close></SurfaceHeader>
      <div className="overlay-content"><BaseDialog.Description className="overlay-description">{description}</BaseDialog.Description>
      {children && <div className="overlay-body">{children}</div>}</div>
    </BaseDialog.Popup></BaseDialog.Portal>
  </BaseDialog.Root>;
}
export function Dialog(props: DialogProps) { return <ModalSurface {...props} sheet={false} />; }
export function Sheet(props: DialogProps) { return <ModalSurface {...props} sheet />; }


/** Working catalog consumers share the same public controls. */
export function OverlayPreview({ id }: { id: string }) { return <OverlayExample key={id} id={id} />; }
function OverlayExample({ id }: { id: string }) {
  const [result, setResult] = useState('');
  const [open, setOpen] = useState(false);
  return <div className="overlay-example" data-overlay-example={id}>
    {id === 'menu' && <Menu label="Page actions" items={[
      { id: 'duplicate', label: 'Duplicate', onSelect: () => setResult('Page duplicated in this example.') },
      { id: 'move', label: 'Move', disabled: true, onSelect: () => setResult('Moved.') },
      { id: 'archive', label: 'Archive', onSelect: () => setResult('Page archived in this example.') },
    ]} />}
    {id === 'tooltip' && <><Tooltip label="Project details" content="Show or hide the project note." onClick={() => setOpen(value => !value)} />{open && <p>A collection of references for the next studio project.</p>}</>}
    {id === 'popover' && <Popover label="Page details" title="Page details"><p>Edited by Maya Chen. Updated today.</p><button className="overlay-trigger" onClick={() => setResult('Page bookmarked in this example.')}>Bookmark</button></Popover>}
    {id === 'dialog' && <Dialog label="Reset preferences" title="Reset preferences?" description="This example restores the reading defaults. Nothing is saved." open={open} onOpenChange={setOpen}><div className="overlay-actions"><button className="overlay-trigger" onClick={() => setOpen(false)}>Cancel</button><button className="overlay-trigger" onClick={() => { setResult('Preferences reset in this example.'); setOpen(false); }}>Reset</button></div></Dialog>}
    {id === 'sheet' && <Sheet label="Reading settings" title="Reading settings" description="Choose what appears while you read."><Checkbox id="sheet-captions" label="Keep captions visible" defaultChecked /></Sheet>}
    {result && <output className="overlay-example-status" aria-live="polite">{result}</output>}
  </div>;
}
