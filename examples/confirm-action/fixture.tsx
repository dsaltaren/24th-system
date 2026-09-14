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
import { useState } from 'react';
import { ConfirmAction } from '../../src/product-patterns';
export function Example() {
  const [confirmed, setConfirmed] = useState(false);
  return <>
    <ConfirmAction trigger="Delete example" title="Delete this example?"
      description="This demonstration keeps all data. Nothing is actually deleted."
      confirmationText="DELETE" confirmLabel="Delete example"
      onConfirm={() => setConfirmed(true)} />
    {confirmed && <output>Confirmed in this example. Nothing was deleted.</output>}
  </>;
}
export default Example;