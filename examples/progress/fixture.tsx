import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/feedback-controls.css';
import { Progress } from '../../src/feedback-controls';
export function Example() {
  return <>
<Progress label="Upload" value={40} max={100} />
  </>;
}
export default Example;