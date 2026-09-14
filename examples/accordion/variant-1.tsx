import '../../src/design-tokens.css';
import '../../src/surface-header.css';
import '../../src/disclosure.css';
import '../../src/content-controls.css';
import '../../src/surface-interaction.css';
import { Disclosure } from '../../src/disclosure';
export function Example() {
  return <>
<Disclosure density="reading" title="Try it today: twenty minutes">
  <p>Write one sentence about what keeps stopping you. Choose one small action you can try today.</p>
</Disclosure>
  </>;
}
export default Example;