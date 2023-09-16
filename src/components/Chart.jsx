
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, days }) => {
  const prices = [];
  const date = [];

  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
    else date.push(new Date(arr[i][0]).toLocaleDateString());

    prices.push(arr[i][1]);
  }

  const state = {
    labels: date,
    datasets: [
      {
        label: `Price in ${currency}`,
        backgroundColor: "rgba(255,99,132,0.5)",
        borderColor: "rgb(255,99,132)",
        data: prices,
      },
    ],
  };

  return (
    <div className="line-chart">
      <Line
        data={state}
        options={{
          responsive: true,
        }}
      />
    </div>
  );
};

export default Chart;
