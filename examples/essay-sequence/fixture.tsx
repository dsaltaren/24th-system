import '../../src/design-tokens.css';
import '../../src/essay-sequence.css';
import { EssaySequence } from '../../src/essay-sequence';
export function Example() {
  return <>
<EssaySequence items={[
  'Notice: Write down the event as it happened.',
  'Name: Give the concern a short name.',
  'Try: Choose one small action for tomorrow.',
]} />
  </>;
}
export default Example;