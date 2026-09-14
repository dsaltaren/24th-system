import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import { useId } from 'react';
import { Checkbox } from '../../src/form-controls';
export function Example() {
  const exampleId = useId();
  return <>
<Checkbox error="Review this value before continuing." id={exampleId + "-captions"} name="captions" label="Include captions" defaultChecked />
  </>;
}
export default Example;