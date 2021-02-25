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

export { AccountItem, Result };
