# martijnhols.nl

This is the source code of https://martijnhols.nl, the website for my personal company from which I do freelance work (among other things). This site is greatly over-engineered for the fun of it.

## Installation

Clone the repository and run `yarn` in the root to install the dependencies.

## Folder structure

Since this is a small project, the folder structure is minimal.

- `components` This folder contains the different components that we may use multiple times in other components, slices or pages. Each file should generally only contain a single component.
- `pages` This is a special Next.js folder ([docs](https://nextjs.org/docs/basic-features/pages)). Any components added here will automatically be available as routes. Only use for pages.
- `public` Static content that is served from the root (/).
- `theme` This folder contains theming constants for the app.
- `types` Custom TypeScript type definitions.
- `utils` Utility functions that may be used across the app. Each file should generally only have a single purpose.

## Considerations

There are several things I am considering improving for this app, such as:

- Cypress. I am a big fan of Cypress E2E testing. While it would be overkill for this site, it would be a good opportunity to show off and polish my usual implementation.
- Add a page with local town names for Google indexing so I'm findable for "react developer amersfoort" etc (veenendaal, rhenen)
