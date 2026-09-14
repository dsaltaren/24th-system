import '../../src/design-tokens.css';
import '../../src/overview-grid.css';
import '../../src/surface-interaction.css';
import { OverviewGrid } from '../../src/overview-grid';
export function Example() {
  return <>
<OverviewGrid label="Explore reading components" items={[
  {
    title: 'Reading list', href: '#components/list',
    description: 'Give a collection clear entry points and a visible current location.',
    preview: <span style={{ fontSize: 'var(--font-size-compact, 14px)', lineHeight: 'var(--line-height-compact, 20px)' }}>01 Getting started<br />02 Working together<br />03 What comes next</span>,
  },
  {
    title: 'Breadcrumbs', href: '#components/breadcrumbs',
    description: 'Keep the path visible as readers move from a collection into a story.',
    preview: <span style={{ fontSize: 'var(--font-size-secondary, 16px)', lineHeight: 'var(--line-height-secondary, 24px)' }}><span style={{ color: 'var(--ink-muted, #666)' }}>Library</span> / Field notes</span>,
  },
  {
    title: 'Code block', href: '#components/code',
    description: 'Make a small working example easy to read and copy.',
    preview: <code style={{ fontSize: 'var(--font-size-compact, 14px)', lineHeight: 'var(--line-height-compact, 20px)', whiteSpace: 'pre-wrap' }}>{'const note = {\n  title: "A place to begin",\n  saved: true,\n};'}</code>,
  },
]} />
  </>;
}
export default Example;