import axios from "axios";
import { AccountItem } from "../type";
import calendarListRender from "../calendar/calendarListRender";
import chartRender from "../chart/chart_render";
import globalState from "../globalState";

const editAccounts = async (
  id: string,
  account: AccountItem
): Promise<void> => {
  await axios.patch(`http://localhost:1111/api/account/${id}`, { ...account });
  renderCalendar(globalState.currentDate);
};

export default editAccounts;
