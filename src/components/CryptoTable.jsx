export default function CryptoTable() {
  return (
    <table className="table table-bordered">
      <thead className="table-light">
        <tr>
          <th>Coin</th>
          <th>Price</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bitcoin</td>
          <td>$00000</td>
          <td className="text-success">+0.00%</td>
        </tr>
      </tbody>
    </table>
  );
}
