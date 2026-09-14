import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/surface-header.css';
import '../../src/overlay-controls.css';
import '../../src/basic-extensions.css';
import { Avatar } from '../../src/basic-extensions';
export function Example() {
  return <>
<Avatar name="Alex Morgan" size={32} />
<Avatar name="Alex Morgan" src="/people/alex.jpg" size={40} />
  </>;
}
export default Example;