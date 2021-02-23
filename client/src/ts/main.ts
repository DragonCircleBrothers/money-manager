import renderMain from "./spa/spa";
import renderCalendar from "./calendar/calendar";
import renderdetailList from "./detail/detail_list";

document.addEventListener("DOMContentLoaded", () => {
  renderMain();
  renderCalendar();
  renderdetailList();
});
window.addEventListener("hashchange", renderMain);
