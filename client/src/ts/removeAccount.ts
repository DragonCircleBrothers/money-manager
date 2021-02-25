import axios from "axios";
import renderCalendar from "./calendar/calendar";
import globalState from "./globalState";

const removeAccount = async (id: string): Promise<void> => {
  await axios.delete(`http://localhost:1111/api/account/${id}`);
  renderCalendar(globalState.currentDate);
};

export default removeAccount;
