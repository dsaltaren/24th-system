import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import { FormMessage } from '../../src/form-controls';
export function Example() {
  return <>
<FormMessage status="error">Changes could not be saved. Try again.</FormMessage>
  </>;
}
export default Example;