import axios from "axios";
import { Accounts } from "./type";

const getAccounts = async (): Promise<Accounts[]> => {
  const { data: accounts } = await axios.get(
    "http://localhost:1111/api/account"
  );

  return accounts;
};

export default getAccounts;
