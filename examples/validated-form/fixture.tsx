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
import { ValidatedForm } from '../../src/product-patterns';
export function Example() {
  return <ValidatedForm label="Profile"
    fields={[{ name: 'email', label: 'Email', type: 'email', required: true }]}
    initialValues={{ email: '' }}
    onSubmit={async () => { await new Promise(resolve => setTimeout(resolve, 300)); }}
    successMessage="Saved in this example. Nothing was sent." />;
}
export default Example;