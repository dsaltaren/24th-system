import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/input-extensions.css';
import { useId } from 'react';
import { Choicebox } from '../../src/input-extensions';
import { useState } from "react";
export function Example() {
  const exampleId = useId();
const [value, setValue] = useState("personal");
  return <>
<Choicebox disabled label="Workspace" name={exampleId + "-workspace"} value={value} onValueChange={setValue}
  options={[{value:"personal",label:"Personal"},{value:"team",label:"Team"}]} />
  </>;
}
export default Example;