import globalState from "../globalState";
import chartRender from "../chart/chart_render";
import renderDetailList from "../detail/detail_list";

const mainController = (): void => {
  const $main = document.querySelector(".main") as HTMLElement;

  if (globalState.pageLocation === "chart") {
    const $typeBtn = document.querySelector(
      ".chart__header > .header__btn"
    ) as HTMLElement;
    const $detailList = document.querySelector(
      ".main__detail > .detail__list"
    ) as HTMLElement;

    $typeBtn.onclick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains("header__btn")) {
        return;
      } else if (target.classList.contains("btn__income")) {
        $detailList.innerHTML = "";
        chartRender(
          globalState.currentDate.toISOString().slice(0, 7),
          "income",
          globalState.currentDate
        );
      } else {
        $detailList.innerHTML = "";
        chartRender(
          globalState.currentDate.toISOString().slice(0, 7),
          "outcome",
          globalState.currentDate
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
        const selectedDate = target.dataset.date + "";
        globalState.currentDate = new Date(selectedDate);
        (document.querySelector(".selected") as HTMLElement).classList.remove(
          "selected"
        );
        target.classList.add("selected");
        renderDetailList();
      }
    };
  }
};

export default mainController;
