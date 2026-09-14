import '../../src/design-tokens.css';
import '../../src/selection-controls.css';
import { useState } from 'react';
import { Switch } from '../../src/selection-controls';
export function Example() {
  const [enabled, setEnabled] = useState(true);
  return <Switch label="Show separators" checked={enabled} onCheckedChange={setEnabled} />;
}
export default Example;