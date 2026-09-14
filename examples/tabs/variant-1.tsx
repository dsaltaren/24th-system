import '../../src/design-tokens.css';
import '../../src/surface-header.css';
import '../../src/disclosure.css';
import '../../src/content-controls.css';
import '../../src/surface-interaction.css';
import { Tabs } from '../../src/content-controls';
export function Example() {
  return <>
<Tabs label="Project details" defaultValue="overview" items={[
  { value: 'overview', label: 'Overview', content: <p>A reading workspace for research notes and saved articles.</p> },
  { value: 'activity', disabled: true, label: 'Activity', content: <p>Maya added three articles to the research collection today.</p> },
]} />
  </>;
}
export default Example;