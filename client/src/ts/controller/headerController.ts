import renderCalendar from "../calendar/calendar";
import globalState from "../globalState";
import chartRender from "../chart/chart_render";
import renderDetailList from "../detail/detail_list";
import addModal from "../modal/addModal";

const $year = document.querySelector(".month__year") as HTMLElement;
const $month = document.querySelector(".month__num") as HTMLElement;
const $header = document.querySelector(".header") as HTMLElement;
const $addBtn = document.querySelector(".header__add") as HTMLElement;

const headerController = (): void => {
  if (globalState.pageLocation === "chart") {
    $header.onclick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains("header__prev")) {
        globalState.currentDate = new Date(
          globalState.currentDate.getFullYear(),
          globalState.currentDate.getMonth() - 1,
          globalState.currentDate.getDate()
        );
        const year = globalState.currentDate.getFullYear();
        const month = globalState.currentDate.getMonth();
        $year.textContent = `${year}`;
        $month.textContent = `${month + 1}`;

        chartRender(
          globalState.currentDate.toISOString().slice(0, 7),
          "outcome",
          globalState.currentDate
        );
      }

      if (target.classList.contains("header__next")) {
        globalState.currentDate = new Date(
          globalState.currentDate.getFullYear(),
          globalState.currentDate.getMonth() + 1,
          globalState.currentDate.getDate()
        );
        const year = globalState.currentDate.getFullYear();
        const month = globalState.currentDate.getMonth();
        $year.textContent = `${year}`;
        $month.textContent = `${month + 1}`;

        chartRender(
          globalState.currentDate.toISOString().slice(0, 7),
          "outcome",
          globalState.currentDate
        );
      }

      $addBtn.onclick = () => {
        addModal.addModalRender(
          globalState.currentDate.toISOString().slice(0, 10)
        );
      };
    };
  } else {
    $header.onclick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains("header__prev")) {
        globalState.currentDate = new Date(
          globalState.currentDate.getFullYear(),
          globalState.currentDate.getMonth() - 1,
          globalState.currentDate.getDate()
        );
        renderCalendar(globalState.currentDate);
      }

      if (target.classList.contains("header__next")) {
        globalState.currentDate = new Date(
          globalState.currentDate.getFullYear(),
          globalState.currentDate.getMonth() + 1,
          globalState.currentDate.getDate()
        );
        renderCalendar(globalState.currentDate);
      }
    };

    $addBtn.onclick = () => {
      addModal.addModalRender(
        globalState.currentDate.toISOString().slice(0, 10)
      );
    };
  }
};

export default headerController;
