import Chart from "chart.js";
import getAccounts from "../AccountCRUD/getAccounts";
import { Accounts } from "../type";

function initializeCanvas(parentClass: string, childId: string): void {
  const parent = document.querySelector(`.${parentClass}`) as Node;
  const child = document.querySelector(`#${childId}`) as Node;
  const para = document.createElement("canvas");
  para.setAttribute("id", childId);
  para.setAttribute("width", "400px");
  para.setAttribute("height", "400px");
  parent.replaceChild(para, child);
}

const renderDoughnutChart = (
  amountData: number[],
  categoryData: string[]
): void => {
  initializeCanvas("chart__main", "doughnut");

  const doughnutCtx = document.getElementById("doughnut") as HTMLCanvasElement;
  const myDoughnutChart =
    amountData.length === 0
      ? new Chart(doughnutCtx, {
          type: "doughnut",
          data: {
            labels: ["no data"],
            datasets: [
              {
                label: "no data",
                data: [0],
                backgroundColor: ["rgba(216, 216, 216, 0.6)"],
                borderColor: ["rgba(216, 216, 216, 0.6)"],
              },
            ],
          },
          options: {
            responsive: false,
          },
        })
      : new Chart(doughnutCtx, {
          type: "doughnut",
          data: {
            labels: categoryData,
            datasets: [
              {
                data: amountData,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(94,95,171, 0.6)",
                  "rgba(238,210,156, 0.6)",
                  "rgba(255,128,160, 0.6)",
                  "rgba(255,201,220, 0.6)",
                  "rgba(17,193,244, 0.6)",
                  "rgba(85,232,236, 0.6)",
                  "rgba(107,195,255, 0.6)",
                  "rgba(123,221,164, 0.6)",
                  "rgba(68,180,143, 0.6)",
                ],
                borderColor: [
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(94,95,171, 1)",
                  "rgba(238,210,156, 1)",
                  "rgba(255,128,160, 1)",
                  "rgba(255,201,220, 1)",
                  "rgba(17,193,244, 1)",
                  "rgba(85,232,236, 1)",
                  "rgba(107,195,255, 1)",
                  "rgba(123,221,164, 1)",
                  "rgba(68,180,143, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: false,
          },
        });
};

const renderBarChart = (
  amountData: number[],
  categoryData: string[],
  accountData: Accounts[]
): void => {
  initializeCanvas("main__detail", "bar");

  const barCtx = document.getElementById("bar") as HTMLCanvasElement;
  const myBarChart =
    amountData.length === 0
      ? new Chart(barCtx, {
          type: "horizontalBar",
          data: {
            labels: ["no data"],
            datasets: [
              {
                label: "no data",
                data: [0],
                backgroundColor: ["rgba(216, 216, 216, 0.6)"],
                borderColor: ["rgba(216, 216, 216, 0.6)"],
              },
            ],
          },
          options: {
            responsive: false,
            scales: {
              xAxes: [
                {
                  ticks: {
                    min: 0,
                  },
                },
              ],
            },
          },
        })
      : new Chart(barCtx, {
          type: "horizontalBar",
          data: {
            labels: categoryData,
            datasets: [
              {
                label: "# of category",
                data: amountData.map((v) => Math.abs(v)),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(94,95,171, 0.6)",
                  "rgba(238,210,156, 0.6)",
                  "rgba(255,128,160, 0.6)",
                  "rgba(255,201,220, 0.6)",
                  "rgba(17,193,244, 0.6)",
                  "rgba(85,232,236, 0.6)",
                  "rgba(107,195,255, 0.6)",
                  "rgba(123,221,164, 0.6)",
                  "rgba(68,180,143, 0.6)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(94,95,171, 1)",
                  "rgba(238,210,156, 1)",
                  "rgba(255,128,160, 1)",
                  "rgba(255,201,220, 1)",
                  "rgba(17,193,244, 1)",
                  "rgba(85,232,236, 1)",
                  "rgba(107,195,255, 1)",
                  "rgba(123,221,164, 1)",
                  "rgba(68,180,143, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: false,
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    min: 0,
                  },
                },
              ],
            },
            onClick: function (e) {
              const $detailList = document.querySelector(
                ".main__detail > .detail__list"
              ) as HTMLElement;

              const chartLabelData: any = myBarChart.getElementsAtEvent(e)[0];

              if (chartLabelData === undefined) return;

              const labelName: string = chartLabelData._model.label;

              console.log(labelName);
              console.log(accountData);

              const categoryData = accountData.filter(
                (v: Accounts) => v.category === labelName
              );
              console.log(categoryData);

              $detailList.innerHTML = categoryData
                .map(
                  ({
                    _id,
                    content,
                    payment,
                    amount,
                    date,
                    type,
                  }: Accounts) => `<li id="${_id}">
        <span class="list__date">${date}</span>
        <span class="list__payment">${
          type === "outcome" ? payment : "수입"
        }</span>
        <span class="list__content">${content}</span>
        <span class="list__price">${amount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
      </li>`
                )
                .join("");
            },
          },
        });
};

const chartRender = async (
  monthYear: string,
  someType: string,
  currentDate: Date
): Promise<void> => {
  const $year = document.querySelector(".month__year") as HTMLElement;
  const $month = document.querySelector(".month__num") as HTMLElement;
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  $year.textContent = `${year}`;
  $month.textContent = `${month + 1}`;

  const res = await getAccounts();
  console.log(res);

  // 월 별로 income outcome 데이서 분류
  const accountData = res.filter(
    ({ date, type }: { date: string; type: string }) =>
      date.includes(monthYear) && type.includes(someType)
  );
  console.log(accountData);

  const categoryData = accountData
    .map(({ category }: { category: string }) => category)
    .filter((v: string, i: number, arr: string[]) => arr.indexOf(v) === i);
  console.log(categoryData);

  const amountData = Object.values(
    accountData.reduce((acc: any, cur: Accounts) => {
      acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
      return acc;
    }, {})
  ) as number[];
  console.log(amountData);

  const incomeAmount: number = res
    .filter(
      (v: Accounts) => v.date.includes(monthYear) && v.type.includes("income")
    )
    .reduce((acc: number, cur: Accounts) => acc + cur.amount, 0);

  const outcomeAmount: number = res
    .filter(
      (v: Accounts) => v.date.includes(monthYear) && v.type.includes("outcome")
    )
    .reduce((acc: number, cur: Accounts) => acc + cur.amount, 0);

  const $incomeAmount = document.querySelector(".income__price") as HTMLElement;
  const $outcomeAmount = document.querySelector(
    ".outcome__price"
  ) as HTMLElement;

  $incomeAmount.textContent = (incomeAmount + "").replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  $outcomeAmount.textContent = (outcomeAmount + "").replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  renderDoughnutChart(amountData, categoryData);
  renderBarChart(amountData, categoryData, accountData);
};

export default chartRender;
