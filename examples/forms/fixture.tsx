import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import { useId } from 'react';
import { TextField, SelectField } from '../../src/form-controls';
export function Example() {
  const exampleId = useId();
  return <>
<div className="form-example">
  <TextField id={exampleId + "-email"} label="Email" name="email" type="email" required />
  <SelectField id={exampleId + "-topic"} label="Topic" name="topic">
    <option value="design">Design</option>
    <option value="engineering">Engineering</option>
  </SelectField>
</div>
  </>;
}
export default Example;