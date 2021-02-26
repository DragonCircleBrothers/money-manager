import getAccounts from "../AccountCRUD/getAccounts";
import { AccountItem, Result } from "../type";
import eachCalendarDate from "../utils/eachCalendarDate";
import amountRender from "./amountRender";
import formattedDate from "../utils/formattedDate";

const calendarListRender = async (
  year: number,
  month: number
): Promise<void> => {
  const account = await getAccounts();
  const accountList: (string | number)[][] = [];
  const result: Result = {} as Result;

  account.forEach(
    (account: AccountItem) => (result[account.date as "date"] = [0, 0])
  );

  for (let i = 0; i < account.length; i++) {
    if (account[i].amount > 0 && new Date(account[i].date).getMonth() === month)
      accountList.push([account[i].date, account[i].amount, 0]);
    if (account[i].amount < 0 && new Date(account[i].date).getMonth() === month)
      accountList.push([account[i].date, 0, account[i].amount]);
  }

  for (let j = 0; j < accountList.length; j++) {
    Object.entries(result).forEach(([key, value]) => {
      if (accountList[j][0] === key) {
        value[0] += accountList[j][1];
        value[1] += accountList[j][2];
      }
    });
  }

  eachCalendarDate(year, month).forEach((item) => {
    Object.entries(result).forEach(([key, value]) => {
      if (formattedDate(item) === key) {
        const $unemptyCell = document.querySelector(
          `div[data-date="${key}"]`
        ) as HTMLElement;

        const firstCell = $unemptyCell.firstElementChild as HTMLElement;
        const lastCell = $unemptyCell.lastElementChild as HTMLElement;

        if (value[0]) {
          firstCell.textContent = (value[0] + "").replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          );
        }
        if (value[1]) {
          lastCell.textContent = (value[1] + "").replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          );
        }

        firstCell.style.display = "block";
        lastCell.style.display = "block";
      }
    });
  });

  amountRender(result);
};

export default calendarListRender;
