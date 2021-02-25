import { Result } from "../type";

const amountRender = (result: Result): void => {
  let monthIncomeTotal = 0;
  let monthOutcomeTotal = 0;
  let monthTotal = 0;

  const $monthIncomeTotal = document.querySelector(
    ".income__price"
  ) as HTMLElement;
  const $monthOutcomeTotal = document.querySelector(
    ".outcome__price"
  ) as HTMLElement;
  const $monthTotal = document.querySelector(".total__price") as HTMLElement;

  Object.entries(result).forEach(([, value]) => {
    monthIncomeTotal += value[0];
    monthOutcomeTotal += value[1];
    monthTotal += value[0] + value[1];
  });

  $monthIncomeTotal.textContent = (monthIncomeTotal + "").replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  $monthOutcomeTotal.textContent = (monthOutcomeTotal + "").replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  $monthTotal.textContent = (monthTotal + "").replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
};

export default amountRender;
