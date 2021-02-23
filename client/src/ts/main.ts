import renderMain from "./spa/spa";

document.addEventListener("DOMContentLoaded", () => {
  renderMain();
});
window.addEventListener("hashchange", renderMain);
