import '../../src/design-tokens.css';
import '../../src/surface-header.css';
import '../../src/disclosure.css';
import '../../src/content-controls.css';
import '../../src/surface-interaction.css';
import { Accordion } from '../../src/content-controls';
export function Example() {
  return <>
<Accordion items={[
  { id: 'delivery', title: 'Delivery', content: <p>Files arrive by email.</p> },
]} defaultOpen={[]} />
  </>;
}
export default Example;