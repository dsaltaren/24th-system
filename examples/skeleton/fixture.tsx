import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/feedback-controls.css';
import { Skeleton } from '../../src/feedback-controls';
export function Example() {
  return <>
<div aria-busy="true"><Skeleton height={80} /><Skeleton width="70%" /></div>
  </>;
}
export default Example;