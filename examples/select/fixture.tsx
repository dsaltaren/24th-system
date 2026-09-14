import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/input-extensions.css';
import { useId } from 'react';
import { SelectField } from '../../src/form-controls';
export function Example() {
  const exampleId = useId();
  return <>
<SelectField id={exampleId + "-topic"} label="Topic"><option>Design</option><option>Engineering</option></SelectField>
  </>;
}
export default Example;