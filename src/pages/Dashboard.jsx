import { useState, useEffect } from "react";
import CryptoTable from "../components/CryptoTable";
import PortfolioChart from "../components/PortfolioChart";

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("portfolio")) || [];
    setPortfolio(saved);
  }, []);

  const addToPortfolio = (coin) => {
    const amount = prompt("Enter quantity:");
    const buyPrice = prompt("Enter buy price:");

    if (!amount || !buyPrice) return;

    const updated = [
      ...portfolio,
      {
        name: coin.name,
        amount: Number(amount),
        buyPrice: Number(buyPrice),
        currentPrice: coin.current_price,
      },
    ];

    setPortfolio(updated);
    localStorage.setItem("portfolio", JSON.stringify(updated));
  };

  const totalInvestment = portfolio.reduce(
    (sum, c) => sum + c.amount * c.buyPrice,
    0
  );

  const currentValue = portfolio.reduce(
    (sum, c) => sum + c.amount * c.currentPrice,
    0
  );

  const profitLoss = currentValue - totalInvestment;

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      <CryptoTable onAdd={addToPortfolio} />

      <div className="mt-4">
        <h4>Portfolio Summary</h4>
        <p>Total Investment: ${totalInvestment.toFixed(2)}</p>
        <p>Current Value: ${currentValue.toFixed(2)}</p>
        <p>
          Profit / Loss:{" "}
          <strong style={{ color: profitLoss >= 0 ? "green" : "red" }}>
            ${profitLoss.toFixed(2)}
          </strong>
        </p>
      </div>

      {/* ✅ Chart */}
      <PortfolioChart portfolio={portfolio} />
    </div>
  );
}
