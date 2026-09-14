import '../../src/design-tokens.css';
import '../../src/slider.css';
import { Slider } from '../../src/slider';
import { useState } from 'react';
export function Example() {
const [volume, setVolume] = useState(50);
  return <>
<Slider disabled label="Volume" value={volume} onValueChange={setVolume} min={0} max={100} valueLabel={volume + '%'} />
  </>;
}
export default Example;