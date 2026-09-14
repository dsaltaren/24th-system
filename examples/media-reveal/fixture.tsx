import '../../src/design-tokens.css';
import '../../src/media-reveal.css';
import { MediaReveal } from '../../src/media-reveal';
export function Example() {
  return <>
<MediaReveal enabled frameOnHover frameLabel="Portrait" mediaKey="portrait">
  <img src="/sample.svg" width={640} height={640} alt="A neutral geometric sample" style={{ display: 'block', width: '100%', height: 'auto' }} />
</MediaReveal>
  </>;
}
export default Example;