import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function PortfolioChart({ portfolio }) {
  if (!portfolio.length) return null;

  const data = {
    labels: portfolio.map((c) => c.name),
    datasets: [
      {
        label: "Investment ($)",
        data: portfolio.map((c) => c.amount * c.buyPrice),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Current Value ($)",
        data: portfolio.map((c) => c.amount * c.currentPrice),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="mt-5">
      <h4>Portfolio Chart</h4>
      <Bar data={data} />
    </div>
  );
}
