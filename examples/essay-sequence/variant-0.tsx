import '../../src/design-tokens.css';
import '../../src/essay-sequence.css';
import { EssaySequence } from '../../src/essay-sequence';
export function Example() {
  return <>
<EssaySequence items={['Write one honest sentence.', 'Name what you can change today.']} />
  </>;
}
export default Example;