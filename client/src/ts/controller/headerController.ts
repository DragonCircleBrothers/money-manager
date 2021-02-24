import renderCalendar from "../calendar/calendar";
import globalState from "../globalState";
import chartRender from "../chart/chart_render";
<<<<<<< HEAD
import renderDetailList from "../detail/detail_list";
=======
import addModal from "../modal/addModal";
>>>>>>> d33c486b6d010cf3e5ac94207d7e51cb3da250b2

const $year = document.querySelector(".month__year") as HTMLElement;
const $month = document.querySelector(".month__num") as HTMLElement;

const headerController = () => {
  const $header = document.querySelector(".header") as HTMLElement;

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
          "outcome"
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
          "outcome"
        );
      }
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
        renderDetailList();
      }

      if (target.classList.contains("header__next")) {
        globalState.currentDate = new Date(
          globalState.currentDate.getFullYear(),
          globalState.currentDate.getMonth() + 1,
          globalState.currentDate.getDate()
        );
        renderCalendar(globalState.currentDate);
        renderDetailList();
      }
    };

    const $addBtn = document.querySelector(".header__add") as HTMLElement;

    $addBtn.onclick = () => {
      addModal.addModalRender(
        globalState.currentDate.toISOString().slice(0, 10)
      );
    };
  }
};

export default headerController;
