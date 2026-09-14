import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/surface-header.css';
import '../../src/overlay-controls.css';
import '../../src/basic-extensions.css';
import { useId } from 'react';
import { FileUpload } from '../../src/basic-extensions';
export function Example() {
  const exampleId = useId();
  return <div className="basic-extension-example">
    <FileUpload disabled id={exampleId + "-attachments"} label="Attachments" multiple
      accept=".png,.jpg,.pdf" maxBytes={1048576} onFilesChange={() => {}} />
    <output>Nothing uploaded.</output>
  </div>;
}
export default Example;