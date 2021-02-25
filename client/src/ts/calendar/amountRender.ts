interface Result {
  date: number[];
}

const amountRender = (result: Result) => {
  const $monthIncomeTotal = document.querySelector(".income__price");
  const $monthOutcomeTotal = document.querySelector(".outcome__price");
  const $monthTotal = document.querySelector(".total__price");

  // TODO: 계산, 모달수정
};

export default amountRender;
