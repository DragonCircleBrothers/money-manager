type AccountItem = {
  date: string;
  type: string;
  amount: number;
  content: string | null;
  category: string;
  payment: string | null;
};

interface Result {
  date: number[];
}

interface Accounts {
  date: string;
  amount: number;
  category: string;
  content: string;
  payment: string;
  type: string;
  _id: string;
}

interface route {
  "": string;
  chart: string;
  [propsName: string]: any;
}

export { AccountItem, Result, Accounts, route };
