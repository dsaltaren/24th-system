import '../../src/design-tokens.css';
import '../../src/surface-header.css';
import '../../src/disclosure.css';
import '../../src/content-controls.css';
import '../../src/reading-links.css';
import '../../src/surface-interaction.css';
import { Breadcrumbs } from '../../src/content-controls';
export function Example() {
  return <>
<Breadcrumbs items={[
  { label: 'Projects', href: '/projects' },
  { label: '24th' },
]} />
  </>;
}
export default Example;