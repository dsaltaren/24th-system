import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/surface-header.css';
import '../../src/overlay-controls.css';
import { Sheet } from '../../src/overlay-controls';
import { useId } from 'react';
import { Checkbox } from '../../src/form-controls';
export function Example() {
const captionsId = useId();
  return <>
<Sheet label="Reading settings" title="Reading settings"
  description="Choose what appears while you read.">
  <Checkbox id={captionsId} label="Keep captions visible" defaultChecked />
</Sheet>
  </>;
}
export default Example;