import renderMain from "./spa/spa";
import "../asset/spinner.svg";

document.addEventListener("DOMContentLoaded", () => {
  renderMain();
});
window.addEventListener("hashchange", renderMain);
