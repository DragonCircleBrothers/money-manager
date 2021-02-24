import axios from "axios";
import AccountItem from "./type";

const getAccounts = async () => {
  const { data: accounts } = await axios.get(
    "http://localhost:1111/api/account"
  );
  return accounts;
};

export default getAccounts;
