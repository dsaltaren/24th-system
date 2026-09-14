import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/surface-header.css';
import '../../src/overlay-controls.css';
import '../../src/basic-extensions.css';
import { useId } from 'react';
import { useState } from 'react';
import { DatePicker } from '../../src/basic-extensions';
export function Example() {
  const exampleId = useId();
  const [date, setDate] = useState<string | undefined>('2026-09-15');
  return <DatePicker id={exampleId + "-review-date"} label="Review date" value={date}
    onValueChange={setDate} min="2026-09-10" max="2026-10-20" />;
}
export default Example;