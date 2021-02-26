import axios from "axios";
import { AccountItem } from "../type";
import chartRender from "../chart/chart_render";
import globalState from "../globalState";
import renderCalendar from "../calendar/calendar";

const postAccounts = async (account: AccountItem): Promise<void> => {
  await axios.post("http://localhost:1111/api/account", { ...account });

  if (globalState.pageLocation === "chart") {
    chartRender(
      globalState.currentDate.toISOString().slice(0, 7),
      account.type,
      globalState.currentDate
    );
  } else {
    renderCalendar(globalState.currentDate);
  }
};

export default postAccounts;
