import headerController from "../controller/headerController";
import chartRender from "../chart/chart_render";
import renderCalendar from "../calendar/calendar";
import globalState from "../globalState";
import mainController from "../controller/mainController";
import sleep from "../sleep";
import { route } from "../type";

const root = document.querySelector("main") as HTMLElement;

const routes: route = {
  // hash: url
  "": "./html/home.html",
  chart: "./html/chart.html",
};

const render = async (): Promise<void> => {
  try {
    const $spinner = document.querySelector(
      ".spinner__container"
    ) as HTMLElement;

    $spinner.style.display = "block";

    // url의 hash를 취득
    const hash: string = location.hash.replace("#", "");
    const url: string = routes[hash];

    if (!url) {
      root.innerHTML = `${hash} Not Found`;
      return;
    }

    const res: Response = await fetch(url);

    root.innerHTML = await res.text();

    if (window.location.hash === "#chart") {
      globalState.pageLocation = "chart";
      chartRender(
        globalState.currentDate.toISOString().slice(0, 7),
        "outcome",
        globalState.currentDate
      );
    } else {
      globalState.pageLocation = "home";
      renderCalendar(globalState.currentDate);
    }
    headerController();
    mainController();

    await sleep(1000);
    $spinner.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};

export default render;
