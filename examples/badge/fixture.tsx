import '../../src/design-tokens.css';
import '../../src/surface-header.css';
import '../../src/disclosure.css';
import '../../src/content-controls.css';
import '../../src/surface-interaction.css';
import { Badge } from '../../src/content-controls';
export function Example() {
  return <>
<Badge status="success">Published</Badge>
<Badge status="error">Needs attention</Badge>
  </>;
}
export default Example;