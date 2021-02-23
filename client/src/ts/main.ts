import renderMain from "./spa/spa";
import renderCalendar from "./calendar/calendar";

document.addEventListener("DOMContentLoaded", () => {
  renderMain();
  renderCalendar();
});
window.addEventListener("hashchange", renderMain);
