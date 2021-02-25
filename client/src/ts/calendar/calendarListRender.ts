import getAccounts from "../getAccounts";
import { AccountItem } from "../type";
import eachCalendarDate from "../utils/eachCalendarDate";
import amountRender from "./amountRender";
import headerController from "../controller/headerController";

const calendarListRender = async (
  year: number,
  month: number
): Promise<void> => {
  const account = await getAccounts();
  const accountList: any[] = [];
  const result: any = {};

  account.forEach((account: AccountItem) => {
    result[account.date] = [0, 0];
  });

  for (let i = 0; i < account.length; i++) {
    if (
      account[i].amount > 0 &&
      new Date(account[i].date).getMonth() === month
    ) {
      accountList.push([account[i].date, account[i].amount, 0]);
    } else if (
      account[i].amount < 0 &&
      new Date(account[i].date).getMonth() === month
    ) {
      accountList.push([account[i].date, 0, account[i].amount]);
    }
  }

  for (let j = 0; j < accountList.length; j++) {
    Object.entries<number[]>(result).forEach(([key, value]) => {
      if (accountList[j][0] === key) {
        value[0] += accountList[j][1];
        value[1] += accountList[j][2];
      }
    });
  }

  eachCalendarDate(year, month).forEach((item) => {
    Object.entries<number[]>(result).forEach(([key, value]) => {
      if (item.toISOString().slice(0, 10) === key) {
        const a = document.querySelector(
          `div[data-date="${key}"]`
        ) as HTMLElement;

        const fc = a.firstElementChild as HTMLElement;
        const lc = a.lastElementChild as HTMLElement;
        fc.style.display = "block";
        lc.style.display = "block";
        fc.textContent = (value[0] + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        lc.textContent = (value[1] + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    });
  });

  amountRender(result);
  headerController(result);
};

export default calendarListRender;
