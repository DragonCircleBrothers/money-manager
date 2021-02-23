import formattedDate from "./utils/formattedDate";
import eachCalendarDate from "./utils/eachCalendarDate";
import isEqualDate from "./utils/isEqualDate";
import addModal from "../modal/addModal";

const $header = document.querySelector(".header") as HTMLElement;
const $main = document.querySelector(".main") as HTMLElement;
const $year = document.querySelector(".month__year") as HTMLElement;
const $month = document.querySelector(".month__num") as HTMLElement;

let currentDate = new Date();

const renderCalendar = (() => {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  $header.onclick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("header__prev")) {
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      );
      return renderCalendar();
    }

    if (target.classList.contains("header__next")) {
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      );
      return renderCalendar();
    }
  };

  $main.onclick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains("calendar-sell") &&
      !target.classList.contains("selected")
    ) {
      const selectedDate = target.dataset.date + "";
      console.log(target.dataset.date);
      currentDate = new Date(selectedDate);
      console.log(currentDate);
      addModal.addModalRender(selectedDate);
      addModal.eventHandler();
    }
  };

  return () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const classNames = (date: Date) => {
      const today = new Date();
      const res = [];

      if (isEqualDate(date, today)) res.push("today");
      // if (date.getMonth() !== month) res.push("muted");
      if (date.getMonth() !== month) res.push("calendar__not-present-month");
      if (!date.getDay()) res.push("sun");
      if (date.getDay() === 6) res.push("sat");
      if (isEqualDate(date, currentDate)) res.push("selected");

      return res.join(" ");
    };

    $year.textContent = `${year}`;
    $month.textContent = `${month + 1}`;

    $main.innerHTML = `
      <div class="amount-section">
        <div class="amount-section__income">
          <span class="income__title">수입</span>
          <span class="income__price"></span>
        </div>
        <div class="amount-section__outcome">
          <span class="outcome__title">지출</span>
          <span class="outcome__price"></span>
        </div>
        <div class="amount-section__total">
          <span class="total__title">합계</span>
          <span class="total__price"></span>
        </div>
      </div>
      <div class="calendar-container">
        ${dayNames
          .map((day) => `<div class="calendar__day">${day}</div>`)
          .join("")}
        ${eachCalendarDate(year, month)
          .map(
            (date) => `<div data-date="${formattedDate(date)}" 
                    class="calendar-sell ${classNames(date)}">
                    ${date.getDate()}</div>`
          )
          .join("")}
      </div>
    `;
  };
})();

export default renderCalendar;
