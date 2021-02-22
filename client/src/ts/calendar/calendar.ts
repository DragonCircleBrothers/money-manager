const currentDate = new Date();
const $header = document.querySelector(".header") as HTMLElement;
const $main = document.querySelector(".main") as HTMLElement;

const formattedDate = (() => {
  const format = (n: number) => (n < 10 ? "0" + n : n + "");
  return (date: Date) =>
    `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(
      date.getDate()
    )}`;
})();

const renderCalendar = (() => {
  const monthNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const eachCalendarDate = (() => {
    const diffDays = (from: number, to: number): number => {
      return Math.abs(to - from) / 86400000;
    };

    return (currentYear: number, currentMonth: number) => {
      const firstDay = new Date(currentYear, currentMonth, 1).getDay() + 1;
      const lastDay = new Date(currentYear, currentMonth + 1, 0).getDay() + 1;
      const from = new Date(currentYear, currentMonth, 1 - (firstDay - 1));
      const to = new Date(currentYear, currentMonth + 1, 7 - lastDay);

      const fromMilliSeconds = from.getMilliseconds();
      const toMilliSeconds = to.getMilliseconds();

      return Array.from(
        { length: diffDays(fromMilliSeconds, toMilliSeconds) + 1 },
        (_, i) => {
          if (i) from.setDate(from.getDate() + 1);
          return new Date(from);
        }
      );
    };
  })();

  const isEqualDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const classNames = (date: Date) => {
      const today = new Date();
      const res = [];

      if (isEqualDate(date, today)) res.push("today");
      if (date.getMonth() !== month) res.push("muted");
      if (!date.getDay()) res.push("sun");
      if (date.getDay() === 6) res.push("sat");
      if (isEqualDate(date, currentDate)) res.push("selected");

      return res.join(" ");
    };

    $header.innerHTML = `
      <button class="header__chart"><i class="far fa-chart-bar"></i></button>
      <button class="header__prev fas fa-chevron-left"></button>
      <div class="header__date">
        <div class="date__year"><span class="month__year">2021</span>년</div>
        <div class="date__month"><span class="month__num">2</span>월</div>
      </div>
      <button class="header__next fas fa-chevron-right"></button>
      <button class="header__add"><i class="fas fa-plus-circle"></i></button>
    `;
    $main.innerHTML = `
      <div class="calendar-container">

      </div>
    `;
  };
})();

const calendar = (): void => {};

export default calendar;
