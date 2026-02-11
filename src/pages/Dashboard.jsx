import { useState, useEffect } from "react";
import CryptoTable from "../components/CryptoTable";
import PortfolioChart from "../components/PortfolioChart";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("portfolio")) || [];
      setPortfolio(saved);
      setLoading(false);
    }
  }, []);

  const addToPortfolio = (coin) => {
    const amount = prompt("Enter quantity:");
    const buyPrice = prompt("Enter buy price:");

    if (!amount || !buyPrice) {
      setMessage("Operation cancelled.");
      return;
    }

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
    setMessage(`${coin.name} added to portfolio successfully!`);
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
    if (!portfolio.length) {
      setMessage("No data available to export.");
      return;
    }

    const headers = ["Coin", "Amount", "Buy Price", "Current Price"];
    const rows = portfolio.map((c) => [
      c.name,
      c.amount,
      c.buyPrice,
      c.currentPrice,
    ]);

    const csvContent =
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
    if (!portfolio.length) {
      setMessage("No data available to export.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Crypto Portfolio Report", 14, 15);

    autoTable(doc, {
      startY: 25,
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

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-4 text-center">Crypto Dashboard</h2>

      {message && (
        <div className="alert alert-info alert-dismissible fade show">
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage("")}
          ></button>
        </div>
      )}

      <div className="table-responsive">
        <CryptoTable onAdd={addToPortfolio} />
      </div>

      <div className="mt-3 text-center">
        <button
          className="btn btn-outline-primary me-2"
          onClick={exportCSV}
        >
          Export CSV
        </button>

        <button
          className="btn btn-outline-danger"
          onClick={exportPDF}
        >
          Export PDF
        </button>
      </div>

      <div className="mt-4 card p-3 shadow-sm">
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

      <div className="mt-4">
        <PortfolioChart portfolio={portfolio} />
      </div>
    </div>
  );
}
