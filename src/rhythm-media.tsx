import type { CSSProperties, ReactNode } from 'react';

/** Reserve a grid-sized box before loading, without stretching or cropping the asset. */
export function RhythmMedia({ width, height, children, className = '' }: {
  width: number; height: number; children: ReactNode; className?: string;
}) {
  return <div className={`rhythm-media ${className}`} style={{ '--media-ratio': height / width } as CSSProperties}>
    <div className="rhythm-media-slot">{children}</div>
  </div>;
}
