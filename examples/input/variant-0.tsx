import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/input-extensions.css';
import { useId } from 'react';
import { TextField } from '../../src/form-controls';
export function Example() {
  const exampleId = useId();
  return <>
<TextField hint="This value stays on your device." id={exampleId + "-value"} label="Your text" />
  </>;
}
export default Example;