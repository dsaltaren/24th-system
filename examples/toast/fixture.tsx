import '../../src/design-tokens.css';
import '../../src/form-controls.css';
import '../../src/feedback-controls.css';
import { ToastProvider, useToast } from '../../src/feedback-controls';
import { Button } from '../../src/form-controls';
function SaveNotice() {
  const toast = useToast();
  return <Button onClick={() => toast.show({ title: 'Saved.', tone: 'success' })}>Save changes</Button>;
}
export function Example() { return <ToastProvider><SaveNotice /></ToastProvider>; }
export default Example;