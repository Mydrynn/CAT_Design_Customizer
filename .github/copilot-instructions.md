# Copilot Instructions for CAT_Design_Customizer

## Project overview
- This repository contains a static client-facing editor mockup for customizing course information in Catalyst/eDesign.
- The app is currently implemented as a simple front-end prototype using plain HTML, CSS, and vanilla JavaScript.
- The main user experience lives in `index.html`, styling is in `styles.css`, and interactive behavior is in `script.js`.

## Architecture and UI behavior
- `index.html` defines a two-column course configuration layout with a main content form and a metadata sidebar.
- `script.js` controls UI-only interactions such as:
  - course type card selection
  - publish dropdown open/close behavior
  - shape toggle state updates
  - switching between standard course mode and Asset mode
  - showing asset upload controls based on selected asset type
  - drag-and-drop file selection feedback for asset uploads
  - mock toast notifications for Create buttons
- `styles.css` provides the visual system, layout, responsive behavior, form styling, upload drop target styling, and utility classes like `.hidden`.

## Working conventions
- Keep the project dependency-free unless explicitly required.
- Prefer small, focused DOM updates over broad structural rewrites.
- Preserve the existing mockup behavior and styling patterns when adding new UI states.
- Reuse the `.hidden` utility for conditional display logic whenever possible.
- Maintain accessibility basics already present in the markup, including labels, button semantics, and ARIA attributes.

## Testing guidance
- There is currently no automated test harness configured in this repository.
- For UI changes, validate behavior manually in the browser and keep JavaScript logic simple and deterministic.
- If a future change introduces a test framework, add targeted unit tests for DOM behavior in `script.js`.

## Security and implementation notes
- Treat all new UI inputs as display-only unless a future backend is introduced.
- Do not introduce secrets, external credentials, remote script dependencies, or unsafe dynamic HTML injection.
- Prefer `textContent`, `value`, and explicit DOM APIs over `innerHTML` for user-facing dynamic updates unless there is a strong reason.
