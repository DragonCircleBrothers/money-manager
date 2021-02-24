import Chart from "chart.js";
import axios from "axios";

const renderDoughnutChart = (amountData: any, categoryData: any): void => {
  const doughnutCtx = document.getElementById("doughnut") as HTMLCanvasElement;
  const myDoughnutChart: Chart = new Chart(doughnutCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: amountData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: categoryData,
    },
    options: {
      responsive: false,
    },
  });
};

const renderBarChart = (amountData: any, categoryData: any): void => {
  const barCtx = document.getElementById("bar") as HTMLCanvasElement;
  const myBarChart: Chart = new Chart(barCtx, {
    type: "horizontalBar",
    data: {
      labels: categoryData,
      datasets: [
        {
          label: "# of Votes",
          data: amountData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
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

const getData = async () => {
  const data = await axios.get("http://localhost:1111/api/account");
  console.log(data);

  const product = await data.data.filter(
    ({ date, type }: { date: string; type: string }) =>
      date.includes("2021-02") && type.includes("outcome")
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

  renderDoughnutChart(amountData, categoryData);
  renderBarChart(amountData, categoryData);
};

export default getData;
