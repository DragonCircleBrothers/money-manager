const formattedDate = (() => {
  const format = (n: number) => (n < 10 ? "0" + n : n + "");
  return (date: Date) =>
    `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(
      date.getDate()
    )}`;
})();

export default formattedDate;
