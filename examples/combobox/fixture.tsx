import '../../src/design-tokens.css';
import '../../src/combobox-controls.css';
import { useState } from 'react';
import { Combobox } from '../../src/combobox-controls';
export function Example() {
const [value, setValue] = useState<string | null>(null);
  return <>
<Combobox label="Discipline" value={value} onValueChange={setValue}
  options={[{ value: 'design', label: 'Design' }]} />
  </>;
}
export default Example;