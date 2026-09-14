import '../../src/design-tokens.css';
import '../../src/surface.css';
import '../../src/surface-header.css';
import { useRef } from 'react';
import { SurfaceHeader } from '../../src/surface-header';
import { useScrollHeader } from '../../src/scroll-header';
export function Example() {
  const surface = useRef<HTMLDivElement>(null);
  useScrollHeader(surface, 'example');
  return <div ref={surface} data-header-surface style={{ height: 240, overflowY: 'auto' }}>
    <SurfaceHeader standard>A day at the studio</SurfaceHeader><div style={{ padding: 24 }}>
      <p>The morning begins around a shared table. Sketches, photographs and notes leave room for everyone to bring a different perspective.</p>
      <p>By midday, the team has chosen one direction to explore. A rough prototype makes the idea tangible enough to discuss together.</p>
      <p>Later, they return to the details: the words on a button, the order of a form and the space around an image.</p>
      <p>The day ends with a smaller set of decisions and a clearer place to begin tomorrow.</p>
    </div></div>;
}
export default Example;