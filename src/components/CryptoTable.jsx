import { useEffect, useState } from "react";
import { cryptoApi } from "../api";

export default function CryptoTable({ onAdd }) {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cryptoApi
      .get("/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      })
      .then((res) => setCoins(res.data));
  }, []);

  const filtered = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4">
      <input
        className="form-control mb-3"
        placeholder="Search coin"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price ($)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>${coin.current_price}</td>
              <td>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => onAdd(coin)}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
