import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/feedback-controls.css';
import { Alert } from '../../src/feedback-controls';
export function Example() {
  return <>
<Alert tone="error">Could not save. Try again.</Alert>
  </>;
}
export default Example;