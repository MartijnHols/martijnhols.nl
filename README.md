# martijnhols.nl

This is the source code of https://martijnhols.nl, the website for my personal company from which I do freelance work (among other things). This site is greatly over-engineered for the fun of it.

## Installation

Clone the repository and run `yarn` in the root to install the dependencies.

## Getting Started

To develop, you need to start both the Next and SliceMachine servers either by calling `yarn start` and `yarn slicemachine` in two separate CLIs, or `yarn start-all` to run them in a single CLI. This launches the Next app at http://localhost:3000 and the Prismic SliceMachine at http://localhost:9999.

The SliceMachine allows you to configure the Prismic CMS. In short Custom Types are page-level entities, while slices are parts of Custom Type. See https://prismic.io for more info about Prismic.

The Next app is the rendered site as a user would see it.

To edit content, go to https://prismic.io/dashboard and login. If you don't have a repository yet, create one and update the `apiEndpoint` in `sm.json` (replace `martijnhols` with your new repository name).

## Production build

Sometimes you to start a production build to test things properly (e.g. Lighthouse). You can make one and start it with the following one-liner:

```bash
yarn build && yarn next start
```

This will launch a server at http://localhost:3000.

## Prismic previews

This site supports Prismic previews. To enable it, go to the settings of your repository and add a preview with the following:

**Site Name**: `localhost`
**Domain for your application**: `http://localhost:3000`
**Link Resolver**: `/api/preview`

To test it, change something on your page, save it and hit the preview button next to the save button.

Note that the Prismic toolbar is not enabled.

## Folder structure

Since this is a small project, the folder structure is minimal.

- `components` This folder contains the different components that we may use multiple times in other components, slices or pages. Each file should generally only contain a single component.
- `pages` This is a special Next.js folder ([docs](https://nextjs.org/docs/basic-features/pages)). Any components added here will automatically be available as routes. Only use for pages.
- `public` Static content that is served from the root (/).
- `slices` The Prismic slice components and models. This structure is forced by Prismic.
- `theme` This folder contains theming constants for the app.
- `types` Custom TypeScript type definitions.
- `utils` Utility functions that may be used across the app. Each file should generally only have a single purpose.

## Considerations

There are several things I am considering improving for this app, such as:

- Add a React Architect page
- More info on the hero
- Add some USPs block, or maybe a row with my rate, location (action radius) and experience
- RSS
- Remove Prismic integration. I'm a coder, so hardcoding content is no issue for me (it's actually easier). Better yet, I like having it appear in commit history so I have a log of all changes I made to my site, not just code changes.
- Cypress. I am a big fan of Cypress E2E testing. While it would be overkill for this site, it would be a good opportunity to show off and polish my usual implementation.
- Canonical / alternate / hreflang meta tags
- Add a page with local town names for Google indexing so I'm findable for "react developer amersfoort" etc (veenendaal, rhenen)
