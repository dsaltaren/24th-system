import '../../src/design-tokens.css';
import '../../src/surface-header.css';
import '../../src/disclosure.css';
import '../../src/content-controls.css';
import '../../src/surface-interaction.css';
import { DataTable } from '../../src/content-controls';
export function Example() {
  return <>
<DataTable caption="Projects" rows={[{ id: 'one', name: '24th' }]}
  rowKey={row => row.id}
  columns={[{ key: 'name', header: 'Name', render: row => row.name }]} />
  </>;
}
export default Example;