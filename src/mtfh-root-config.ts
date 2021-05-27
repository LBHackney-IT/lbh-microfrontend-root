import {
    constructApplications,
    constructRoutes,
    constructLayoutEngine,
} from 'single-spa-layout';
import { registerApplication, start } from 'single-spa';

import './root.styles.scss';

System.import('@mtfh/common').then(() => {
    const { isAuthorised } = require('@mtfh/common');
    const template = isAuthorised() ? 'authorised' : 'public';

    const routes = constructRoutes(
        document.querySelector(
            `#single-spa-layout-${template}`
        ) as HTMLTemplateElement,
        {
            loaders: {
                header: '<h1>Loading header</h1>',
            },
            props: {},
            errors: {
                header: '<h1>Failed to load header</h1>',
            },
        }
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
});

start();
