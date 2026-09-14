import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/surface-header.css';
import '../../src/overlay-controls.css';
import '../../src/basic-extensions.css';
import { useRef, useState } from 'react';
import { CommandMenu } from '../../src/basic-extensions';
import { Sheet } from '../../src/overlay-controls';
export function Example() {
  const [result, setResult] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const origin = useRef<HTMLButtonElement>(null);
  return <>
    <CommandMenu triggerRef={origin} commands={[
      { id: 'copy', label: 'Copy page link', group: 'Page',
        onSelect: () => setResult('Example action selected.') },
      { id: 'settings', label: 'Open settings', group: 'Workspace',
        onSelect: () => setSettingsOpen(true) },
    ]} />
    <Sheet label="Reading settings" title="Reading settings"
      description="Choose what appears while you read."
      open={settingsOpen} onOpenChange={setSettingsOpen}
      trigger={false} finalFocus={origin}>
      <p>Your reading preferences stay in this example.</p>
    </Sheet>
    <output aria-live="polite">{result}</output>
  </>;
}
export default Example;