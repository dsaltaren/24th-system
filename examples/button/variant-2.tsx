import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import { Button } from '../../src/form-controls';
export function Example() {
  return <>
<Button variant="secondary" type="submit">Save</Button>
<Button variant="secondary" disabled>Unavailable</Button>
  </>;
}
export default Example;