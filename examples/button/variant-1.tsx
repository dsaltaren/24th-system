import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import { useState, useId } from 'react';
import { Button, TextField } from '../../src/form-controls';
export function Example() {
const fieldId = useId();
const [saved, setSaved] = useState(false);
  return <>
<form onSubmit={event => { event.preventDefault(); setSaved(true); }} style={{display:'grid',gap:8,maxWidth:420}}>
  <div style={{display:'flex',alignItems:'end',gap:8}}>
    <TextField id={fieldId} label="Project name" defaultValue="24th" />
    <Button size="field" type="submit">Save</Button>
  </div>
  {saved && <output style={{fontSize:12,lineHeight:'20px',color:'var(--ink-muted)'}}>Saved in this example.</output>}
</form>
  </>;
}
export default Example;