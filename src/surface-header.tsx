import { createElement, type HTMLAttributes, type Ref } from 'react';

/** The same header paint serves portfolio layouts and standalone scroll surfaces. */
export function SurfaceHeader({ as: Tag = 'header', className = '', standard = false, size = 'regular', divider = true, ...props }: HTMLAttributes<HTMLElement> & { as?: 'header' | 'h1'; standard?: boolean; divider?: boolean; size?: 'regular' | 'compact'; ref?: Ref<HTMLElement> }) {
  return createElement(Tag, { ...props, className: `surface-header ${className}`, 'data-header-layout': standard || undefined, 'data-header-size': size, 'data-header-divider': divider ? undefined : 'none' });
}
