const eachCalendarDate = (() => {
  const diffDays = (from: number, to: number): number => {
    return Math.abs(to - from) / 86400000;
  };

  return (currentYear: number, currentMonth: number) => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay() + 1;
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDay() + 1;
    const from = new Date(currentYear, currentMonth, 1 - (firstDay - 1));
    const to = new Date(currentYear, currentMonth + 1, 7 - lastDay);
    const fromMilliSeconds = from.getTime();
    const toMilliSeconds = to.getTime();

    return Array.from(
      { length: diffDays(fromMilliSeconds, toMilliSeconds) + 1 },
      (_, i) => {
        if (i) from.setDate(from.getDate() + 1);
        return new Date(from);
      }
    );
  };
})();

export default eachCalendarDate;
