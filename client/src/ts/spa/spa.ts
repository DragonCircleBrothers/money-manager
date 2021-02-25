import chartRender from "../chart/chart_render";
import renderCalendar from "../calendar/calendar";
import renderDetailList from "../detail/detail_list";
import globalState from "../globalState";
import headerController from "../controller/headerController";
import mainController from "../controller/mainController";

interface route {
  "": string;
  chart: string;
  [propsName: string]: any;
}

const root = document.querySelector("main") as HTMLElement;

const routes: route = {
  // hash: url
  "": "./html/home.html",
  chart: "./html/chart.html",
};

const render = async () => {
  try {
    // url의 hash를 취득
    const hash = location.hash.replace("#", "");
    const url = routes[hash];
    if (!url) {
      root.innerHTML = `${hash} Not Found`;
      return;
    }

    const res = await fetch(url);

    root.innerHTML = await res.text();

    if (window.location.hash === "#chart") {
      globalState.pageLocation = "chart";
      chartRender(globalState.currentDate.toISOString().slice(0, 7), "outcome");
    } else {
      globalState.pageLocation = "home";
      renderCalendar(globalState.currentDate);
      // renderDetailList();
    }
    headerController();
    mainController();
  } catch (err) {
    console.error(err);
  }
};

export default render;
