import '../../src/design-tokens.css';
import '../../src/selection-controls.css';
import { useId } from 'react';
import { useState } from 'react';
import { SegmentedControl } from '../../src/selection-controls';
export function Example() {
  const exampleId = useId();
  const [size, setSize] = useState('regular');
  return <SegmentedControl label="Size" name={exampleId + "-size"} value={size} onValueChange={setSize}
    options={[{value:'regular',label:'Regular'},{value:'compact',label:'Compact'}]} />;
}
export default Example;