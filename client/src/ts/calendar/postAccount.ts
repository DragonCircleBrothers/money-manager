import axios from "axios";
import AccountItem from "../type";
import calendarListRender from "./calendarListRender";
import globalState from "../globalState";

const postAccounts = async (account: AccountItem): Promise<void> => {
  await axios.post("http://localhost:1111/api/account", { ...account });
  calendarListRender(
    globalState.currentDate.getFullYear(),
    globalState.currentDate.getMonth()
  );
};

export default postAccounts;
