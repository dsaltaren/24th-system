import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/surface-header.css';
import '../../src/overlay-controls.css';
import { Popover } from '../../src/overlay-controls';
export function Example() {
  return <>
<Popover label="Page details" title="Page details">
  <p>Edited by Maya Chen. Updated today.</p>
</Popover>
  </>;
}
export default Example;