import '../../src/design-tokens.css';
import '../../src/disclosure.css';
import '../../src/code-block.css';
import '../../src/surface-interaction.css';
import { CodeBlock } from '../../src/code-block';
export function Example() {
  return <>
<CodeBlock name="example.ts" source="const spacing = 4;" />
  </>;
}
export default Example;