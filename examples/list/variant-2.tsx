import '../../src/design-tokens.css';
import '../../src/reading-list.css';
import '../../src/surface-interaction.css';
import { useId } from 'react';
import { useRef } from 'react';
import { ReadingList } from '../../src/reading-list';
export function Example() {
  const exampleId = useId();
  const target = useRef<HTMLDivElement>(null);
  return <><ReadingList label="Sections" targetRef={target} size="compact" selection="text"
    items={[{ label: 'Forms', href: '#forms', current: true }]} />
    <div id={exampleId + "-forms"} ref={target}>Your profile is ready to review.</div></>;
}
export default Example;