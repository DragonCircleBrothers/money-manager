import renderCalendar from "./calendar/calendar";
// import { renderDoughnutChart, renderBarChart } from "./chart/chart_render";
import detailPopup from "./detail/detail_popup";
import addDetaillist from "./add-detail-list/add-detail-list";

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar();
  detailPopup();
  addDetaillist();
  // renderDoughnutChart();
  // renderBarChart();
});
