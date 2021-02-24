import globalState from "../globalState";
import chartRender from "../chart/chart_render";

const mainController = (): void => {
  const $main = document.querySelector(".main") as HTMLElement;

  if (globalState.pageLocation === "chart") {
    const $typeBtn = document.querySelector(
      ".chart__header > .header__btn"
    ) as HTMLElement;
    $typeBtn.onclick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains("header__btn")) {
        return;
      } else if ((e.target as HTMLElement).classList.contains("btn__income")) {
        chartRender(
          globalState.currentDate.toISOString().slice(0, 7),
          "income"
        );
      } else {
        chartRender(
          globalState.currentDate.toISOString().slice(0, 7),
          "outcome"
        );
      }
    };
  } else {
    $main.onclick = (e: MouseEvent) => {
      let target = e.target as HTMLElement;

      if (target.nodeName === "SPAN") {
        target = target.parentNode as HTMLElement;
      }

      if (target.classList.contains("calendar-cell")) {
        document.querySelector(".selected")?.classList.remove("selected");
        target.classList.add("selected");

        const selectedDate = target.dataset.date + "";

        globalState.currentDate = new Date(selectedDate);
      }
    };
  }
};

export default mainController;
