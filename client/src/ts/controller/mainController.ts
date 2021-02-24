import addModal from "../modal/addModal";
import globalState from "../globalState";
import chartRender from "../chart/chart_render";

const mainController = () => {
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
      const target = e.target as HTMLElement;

      if (target.classList.contains("calendar-cell")) {
        document.querySelector(".selected")?.classList.remove("selected");
        target.classList.add("selected");

        // console.log(target.dataset.date);
        const selectedDate = target.dataset.date + "";

        globalState.currentDate = new Date(selectedDate);
        // console.log(globalState.currentDate);

        // console.log(globalState.currentDate);
      }
    };
  }
};

export default mainController;
