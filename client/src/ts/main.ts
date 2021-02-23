import render from "./spa/spa";
import renderCalendar from "./calendar/calendar";
import detailPopup from "./detail/detail_popup";
import addDetaillist from "./add-detail-list/add-detail-list";

document.addEventListener("DOMContentLoaded", () => {
  render();
  renderCalendar();
  detailPopup();
  addDetaillist();
});
window.addEventListener("hashchange", render);
