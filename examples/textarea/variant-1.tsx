import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/input-extensions.css';
import { useId } from 'react';
import { TextArea } from '../../src/form-controls';
export function Example() {
  const exampleId = useId();
  return <>
<TextArea error="Review this value before continuing." id={exampleId + "-value"} label="Your text" />
  </>;
}
export default Example;