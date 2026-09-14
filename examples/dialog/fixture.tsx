import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/surface-header.css';
import '../../src/overlay-controls.css';
import { Dialog } from '../../src/overlay-controls';
import { useState } from 'react';
import { Button } from '../../src/form-controls';
export function Example() {
const [open, setOpen] = useState(false);
const [result, setResult] = useState('');
  return <>
<Dialog label="Reset preferences" title="Reset preferences?"
  description="Restore the reading defaults." open={open} onOpenChange={setOpen}>
  <Button onClick={() => { setResult('Example reset. Nothing was stored.'); setOpen(false); }}>Reset</Button>
</Dialog>
<output>{result}</output>
  </>;
}
export default Example;