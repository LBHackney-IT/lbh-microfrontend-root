# mtfh-root-config

## Overview

This is the root-config app part of the Single SPA Framework Architecture. It was generated using `create-single-spa` utility and adapted to include a common header and footer. The header and the footer make use of the Hackney Design System. This app is the host for all other microfrontends under the MTFH programme.

## Running it locally
To allow the Google authentication to work locally, you need to alias `http://local.hackney.gov.uk/` to 127.0.0.1 in your local hosts file. This allows the Google authentication token to be accepted as you're on a subdomain of `hackney.gov.uk`.
- Install all dependencies by running `yarn`.
- Run the root application with `yarn start`.
- Load `http://local.hackney.gov.uk:9000` in your browser.

### Loading applications inside the root application locally
Each application that has been configured to run inside the Single SPA framework can either be run in standalone mode or loaded into this root application.

See the README of each application for specific details on how to run that application in either mode.

To load an application into this root application you need to run this root app with `yarn start` and run the application(s) you want to load. With everything running you should be able to just navigate to the route for a specific application to view it.


## Production build

-   You can create a production build by running `yarn build`.

### Testing

-   You can run the unit tests by running `yarn test`.

### Resources

-   [Hackney Design System](https://design-system.hackney.gov.uk/)
-   [Single SPA Framework](https://single-spa.js.org/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Webpack](https://webpack.js.org/)
-   [EJS Templating](https://ejs.co/)
