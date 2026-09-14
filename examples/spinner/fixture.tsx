import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/feedback-controls.css';
import { Spinner } from '../../src/feedback-controls';
export function Example() {
  return <>
<div className="feedback-example"><Spinner label="Loading items" /></div>
  </>;
}
export default Example;