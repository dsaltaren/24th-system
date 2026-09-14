import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/input-extensions.css';
import { useId } from 'react';
import { SearchField } from '../../src/input-extensions';
export function Example() {
  const exampleId = useId();
  return <>
<SearchField disabled id={exampleId + "-value"} label="Search" />
  </>;
}
export default Example;