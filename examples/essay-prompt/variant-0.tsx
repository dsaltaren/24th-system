import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/essay-prompt.css';
import { EssayPrompt } from '../../src/essay-prompt';
export function Example() {
  return <>
<EssayPrompt label="What will you try tomorrow?" placeholder="One sentence per line. No polishing." />
  </>;
}
export default Example;