import Chart from "chart.js";

const renderDoughnutChart = () => {
  const doughnutCtx = document.getElementById("doughnut") as HTMLCanvasElement;
  const myDoughnutChart = new Chart(doughnutCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [10, 20, 30],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["식비", "경조사", "교통비"],
    },
    options: {
      responsive: false,
    },
  });
};

const renderBarChart = () => {
  const barCtx = document.getElementById("bar") as HTMLCanvasElement;
  const myBarChart = new Chart(barCtx, {
    type: "horizontalBar",
    data: {
      labels: ["식비", "교통비", "경조사", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
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

export { renderDoughnutChart, renderBarChart };
