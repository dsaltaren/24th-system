import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import { useState, useId } from 'react';
import { Button, TextField } from '../../src/form-controls';
export function Example() {
const fieldId = useId();
const [saved, setSaved] = useState(false);
  return <>
<form onSubmit={event => { event.preventDefault(); setSaved(true); }} style={{display:'grid',gap:16,width:'100%',maxWidth:420}}>
  <TextField id={fieldId} label="Project name" defaultValue="24th" />
  <Button type="submit" fullWidth>Save project</Button>
  <Button type="button" variant="secondary" onClick={() => setSaved(false)}>Reset confirmation</Button>
  {saved && <output style={{fontSize:12,lineHeight:'20px',color:'var(--ink-muted)'}}>Saved in this example. Nothing was sent.</output>}
</form>
  </>;
}
export default Example;