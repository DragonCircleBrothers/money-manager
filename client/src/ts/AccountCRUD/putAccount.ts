import axios from "axios";
import { AccountItem } from "../type";
import renderCalendar from "../calendar/calendar";
import globalState from "../globalState";

const putAccounts = async (id: string, account: AccountItem): Promise<void> => {
  await axios.put(`http://localhost:1111/api/account/${id}`, { ...account });
  renderCalendar(globalState.currentDate);
};

export default putAccounts;
