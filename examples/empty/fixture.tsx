import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/feedback-controls.css';
import { useState } from 'react';
import { EmptyState } from '../../src/feedback-controls';
import { Button } from '../../src/form-controls';
export function Example() {
  const [hasItem, setHasItem] = useState(false);
  return hasItem ? <div>
    <p>Untitled item</p>
    <Button onClick={() => setHasItem(false)}>Remove item</Button>
  </div> : <EmptyState title="No items yet." description="Add an item to get started."
    action={<Button onClick={() => setHasItem(true)}>Add item</Button>} />;
}
export default Example;