import { registerApplication, start } from "single-spa";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./global.scss";

import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

const routes = constructRoutes(
  document.querySelector("#single-spa-layout") as HTMLTemplateElement
);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
const headerApp = new Header();
const footerApp = new Footer();
start();
