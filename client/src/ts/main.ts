import renderCalendar from "./calendar/calendar";
// import { renderDoughnutChart, renderBarChart } from "./chart/chart_render";
import renderdetailList from "./detail/detail_list";

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar();
  renderdetailList();
  // addDetailList();
  // renderDoughnutChart();
  // renderBarChart();
});
