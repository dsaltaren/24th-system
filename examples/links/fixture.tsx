import '../../src/design-tokens.css';
import '../../src/reading-links.css';
import { ExternalLink } from '../../src/reading-link';
export function Example() {
  return <>
<div className="reading-system">
  <a href="#components/forms">Form controls</a>
  <ExternalLink href="https://www.runeicons.com/">Rune Icons</ExternalLink>
</div>
  </>;
}
export default Example;