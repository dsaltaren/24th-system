import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/surface-header.css';
import '../../src/overlay-controls.css';
import { useState } from 'react';
import { Tooltip } from '../../src/overlay-controls';
export function Example() {
  const [visible, setVisible] = useState(false);
  return <>
    <Tooltip label="Project details" content="Show or hide the project note."
      onClick={() => setVisible(current => !current)} />
    {visible && <p>A collection of references for the next studio project.</p>}
  </>;
}
export default Example;