const $selected = document.querySelector(".selected") as HTMLElement;

// TODO: 인터페이스 중복 해결
type AccountItem = {
  date: string;
  type: string;
  amount: number;
  content: string | null;
  category: string;
  payment: string;
};

const calendarRender = (account: AccountItem): void => {
  const $incomeTotal = document.createElement("span");
  const $outcomeTotal = document.createElement("span");

  $incomeTotal.classList.add("calendar-sell__income");
  $outcomeTotal.classList.add("calendar-sell__outcome");

  $incomeTotal.textContent = "";
  $outcomeTotal.textContent = "";

  $selected.append($incomeTotal, $outcomeTotal);
};

export default calendarRender;
