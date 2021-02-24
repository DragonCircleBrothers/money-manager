import Chart from "chart.js";
import axios from "axios";

function initializeCanvas(parentClass: string, childId: string): void {
  const parent = document.querySelector(`.${parentClass}`) as Node;
  const child = document.querySelector(`#${childId}`) as Node;
  const para = document.createElement("canvas");
  para.setAttribute("id", childId);
  para.setAttribute("width", "400px");
  para.setAttribute("height", "400px");
  parent.replaceChild(para, child);
}

const renderDoughnutChart = (amountData: any, categoryData: any): void => {
  initializeCanvas("chart__main", "doughnut");

  const doughnutCtx = document.getElementById("doughnut") as HTMLCanvasElement;
  const myDoughnutChart = new Chart(doughnutCtx, {
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

const renderBarChart = (amountData: any, categoryData: any): void => {
  initializeCanvas("main__detail", "bar");

  const barCtx = document.getElementById("bar") as HTMLCanvasElement;
  const myBarChart = new Chart(barCtx, {
    type: "horizontalBar",
    data: {
      labels: categoryData,
      datasets: [
        {
          label: "# of category",
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
            ticks: {
              min: 0,
            },
          },
        ],
      },
      onClick: function (e) {
        const category: any = myBarChart.getElementsAtEvent(e)[0];
        if (category === undefined) return;
        console.log(category._model.label);
      },
    },
  });
};

const chartRender = async (
  monthYear: string,
  someType: string
): Promise<void> => {
  const res = await axios.get("http://localhost:1111/api/account");
  console.log(res);

  // 월 별로 income outcome 데이서 분류
  const product = res.data.filter(
    ({ date, type }: { date: string; type: string }) =>
      date.includes(monthYear) && type.includes(someType)
  );
  console.log(product);

  const categoryData = product
    .map(({ category }: { category: string }) => category)
    .filter((v: string, i: number, arr: string[]) => arr.indexOf(v) === i);
  console.log(categoryData);

  const amountData = Object.values(
    product.reduce((acc: any, cur: any) => {
      acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
      return acc;
    }, {})
  );
  console.log(amountData);

  const incomeAmount = res.data
    .filter((v: any) => v.date.includes(monthYear) && v.type.includes("income"))
    .reduce((acc: any, cur: any) => acc + cur.amount, 0);

  const outcomeAmount = res.data
    .filter(
      (v: any) => v.date.includes(monthYear) && v.type.includes("outcome")
    )
    .reduce((acc: any, cur: any) => acc + cur.amount, 0);

  const $incomeAmount = document.querySelector(".income__price") as HTMLElement;
  const $outcomeAmount = document.querySelector(
    ".outcome__price"
  ) as HTMLElement;
  $incomeAmount.textContent = incomeAmount;
  $outcomeAmount.textContent = outcomeAmount;

  renderDoughnutChart(amountData, categoryData);
  renderBarChart(amountData, categoryData);
};

export default chartRender;
