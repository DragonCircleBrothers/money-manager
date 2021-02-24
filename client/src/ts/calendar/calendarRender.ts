import axios from "axios";

// TODO: 인터페이스 중복 해결
type AccountItem = {
  date: string;
  type: string;
  amount: number;
  content: string | null;
  category: string;
  payment: string | null;
};

const calendarRender = async (account: AccountItem): Promise<void> => {
  await axios.post("http://localhost:1111/api/account", { ...account });

  let incomeTotal = 0;
  let outcomeTotal = 0;

  const res = await axios.get("http://localhost:1111/api/account");
  const accountArr = res.data;
  accountArr.forEach((accountItem: AccountItem) => {
    if (accountItem.type === "income") incomeTotal += accountItem.amount;
    else outcomeTotal += accountItem.amount;
  });

  const $selected = document.querySelector(".selected") as HTMLElement;
  const $incomeTotal = document.createElement("span");
  const $outcomeTotal = document.createElement("span");

  $incomeTotal.classList.add("calendar-cell__income");
  $outcomeTotal.classList.add("calendar-cell__outcome");

  $incomeTotal.textContent = incomeTotal + "";
  $outcomeTotal.textContent = outcomeTotal + "";

  $selected.append($incomeTotal, $outcomeTotal);
};

export default calendarRender;
