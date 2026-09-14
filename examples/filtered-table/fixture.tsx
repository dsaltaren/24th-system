import '../../src/design-tokens.css';
import '../../src/surface-header.css';
import '../../src/disclosure.css';
import '../../src/content-controls.css';
import '../../src/form-controls.css';
import '../../src/input-extensions.css';
import '../../src/overlay-controls.css';
import '../../src/feedback-controls.css';
import '../../src/product-patterns.css';
import '../../src/surface-interaction.css';
import { FilteredTable } from '../../src/product-patterns';
export function Example() {
  const projects = [{ id: 'reading', name: '24th' }, { id: 'notes', name: 'Research notes' }];
  return <FilteredTable caption="Projects" rows={projects} rowKey={row => row.id}
    searchText={row => row.name} pageSize={10}
    columns={[{ key: 'name', header: 'Project', render: row => row.name }]} />;
}
export default Example;