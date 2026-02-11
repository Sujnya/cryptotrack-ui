import { useState, useEffect } from "react";
import CryptoTable from "../components/CryptoTable";
import PortfolioChart from "../components/PortfolioChart";
import jsPDF from "jspdf";
import "jspdf-autotable";


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

  const exportCSV = () => {
  if (!portfolio.length) return alert("No data to export");

  const headers = ["Coin", "Amount", "Buy Price", "Current Price"];
  const rows = portfolio.map((c) => [
    c.name,
    c.amount,
    c.buyPrice,
    c.currentPrice,
  ]);

  let csvContent =
    headers.join(",") +
    "\n" +
    rows.map((r) => r.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "portfolio.csv";
  a.click();
};

const exportPDF = () => {
  if (!portfolio.length) return alert("No data to export");

  const doc = new jsPDF();
  doc.text("Crypto Portfolio Report", 14, 10);

  doc.autoTable({
    head: [["Coin", "Amount", "Buy Price", "Current Price"]],
    body: portfolio.map((c) => [
      c.name,
      c.amount,
      c.buyPrice,
      c.currentPrice,
    ]),
  });

  doc.save("portfolio.pdf");
};


  return (
      <div className="container mt-4">
      <h2>Dashboard</h2>

      <CryptoTable onAdd={addToPortfolio} />

      <div className="mt-3">
  <button className="btn btn-outline-primary me-2" onClick={exportCSV}>
    Export CSV
  </button>
  <button className="btn btn-outline-danger" onClick={exportPDF}>
    Export PDF
  </button>
</div>


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
