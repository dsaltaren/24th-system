import '../../src/design-tokens.css';
import '../../src/combobox-controls.css';
import { useState } from 'react';
import { MultiSelect } from '../../src/combobox-controls';
export function Example() {
const [value, setValue] = useState<string[]>([]);
  return <>
<MultiSelect disabled label="Disciplines" value={value} onValueChange={setValue}
  options={[{ value: 'design', label: 'Design' }, { value: 'research', label: 'Research' }]} />
  </>;
}
export default Example;