# Repo to Paper proof

Verified on September 14, 2026 using repository commit `c99efa283a7c64ee1bcdf7cdf64bf13d52fb1980`.

## Procedure and evidence

- Read `src/surface-header.tsx`, `src/surface-header.css` and `src/design-tokens.css` from this repository.
- Built the repository successfully with `npm run build` (TypeScript and Vite).
- The MCP connection could read the published Paper template but could not edit it: Paper returned “Edit access is required”. The original was not modified.
- Created a separate test clone and a dedicated test page: https://app.paper.design/file/01M2HK4NTWSPSVN8THTSECCZ71/2-0.
- Reproduced the standard SurfaceHeader in desktop and narrow specimens from source values. Existing cloned tokens were preserved.
- Read back computed styles: desktop minimum height 56px, vertical/horizontal padding 14px/24px; narrow minimum height 60px and padding 16px; font size 18px, line height 28px and background #fafafa.
- Changed the specimen text from “Project notes” to “Reading notes” through MCP and verified the new text with get_jsx.
- Reviewed one screenshot of the 640px test artboard for clipping and finished the editing session.

## What this proves

An agent with repository access and Paper write access can use source code and token values as context, reproduce a static specimen in Paper, inspect its styles and update it on request.

This does not prove automatic synchronization, React execution in Paper, interaction parity or coverage of every component. The specimen explicitly uses Arial as its host font; the component inherits its host typography. The MCP created the test file in the active team; its privacy was not verified. Editing the original template still requires appropriate permissions.
