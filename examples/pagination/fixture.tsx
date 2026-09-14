import '../../src/design-tokens.css';
import '../../src/surface-header.css';
import '../../src/disclosure.css';
import '../../src/content-controls.css';
import '../../src/surface-interaction.css';
import { useState } from 'react';
import { Pagination } from '../../src/content-controls';
export function Example() {
const [page, setPage] = useState(1);
  return <>
<Pagination page={page} pageCount={8} onPageChange={setPage} />
  </>;
}
export default Example;