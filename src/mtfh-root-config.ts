import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructLayoutEngine,
  constructRoutes,
} from "single-spa-layout";

import "./root.styles.scss";
import { isAuthorised } from "@mtfh/common/lib/auth";
import { getConfiguration } from "@mtfh/common/lib/configuration";

getConfiguration();
const template = isAuthorised() ? "authorised" : "public";
const routes = constructRoutes(
  document.querySelector(`#single-spa-layout-${template}`) as HTMLTemplateElement,
  {
    loaders: {
      header: `
            <header class="lbh-header">
                <div class="lbh-header__main">
                    <div class="lbh-header__title-link lbh-header__logo"></div>
                </div>
            </header>`,
    },
    props: {},
    errors: {
      header: "<h1>Failed to load header</h1>",
    },
  },
);

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

for (const application of applications) {
  registerApplication(application);
}

layoutEngine.activate();

start();
