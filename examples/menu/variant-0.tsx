import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/surface-header.css';
import '../../src/overlay-controls.css';
import { Menu } from '../../src/overlay-controls';
import { useState } from 'react';
export function Example() {
const [result, setResult] = useState('');
  return <>
<Menu disabled label="Page actions" items={[
  { id: 'duplicate', label: 'Duplicate', onSelect: () => setResult('Duplicate requested.') },
  { id: 'archive', label: 'Archive', onSelect: () => setResult('Archive requested.'), disabled: true },
]} />
<output>{result}</output>
  </>;
}
export default Example;