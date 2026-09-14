import { createElement, type HTMLAttributes, type Ref } from 'react';
import './surface.css';

type SurfaceProps = HTMLAttributes<HTMLElement> & { as?: 'section' | 'aside' | 'nav' | 'div'; ref?: Ref<HTMLElement> };
/** A reading surface owns its frame; hosts supply content and navigation. */
export function Surface({ as: Tag = 'section', ...props }: SurfaceProps) {
  return createElement(Tag, { ...props, 'data-surface': true, 'data-header-surface': true });
}
export function SurfaceBody({ as: Tag = 'div', ...props }: HTMLAttributes<HTMLElement> & { as?: 'div' | 'section'; ref?: Ref<HTMLElement> }) {
  return createElement(Tag, { ...props, 'data-surface-body': true });
}
