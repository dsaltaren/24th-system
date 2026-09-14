import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/input-extensions.css';
import { IconButton } from '../../src/input-extensions';
import { Copy } from "../../src/icons";
export function Example() {
  return <>
<IconButton disabled label="Copy" variant="secondary" onClick={() => navigator.clipboard.writeText("24th")}><Copy size={16} strokeWidth={1.5} /></IconButton>
  </>;
}
export default Example;