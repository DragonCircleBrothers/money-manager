import axios from "axios";

const getAccounts = async () => {
  const { data: accounts } = await axios.get(
    "http://localhost:1111/api/account"
  );

  return accounts;
};

export default getAccounts;
