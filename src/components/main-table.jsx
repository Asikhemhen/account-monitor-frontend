import { useState, useEffect } from "react";

const MainTable = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/account_info");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        // console.log(result); // Log the response to inspect it
        setData(result); // Directly set `result` as `data`
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg border shadow-md pt-5">
      <h1 className="text-blue-800 text-center sm:text-left text-2xl font-bold mb-4 px-5">
        Account Details
      </h1>
      <div className="flex flex-col sm:flex-row justify-between basis-auto items-center gap-2 px-5 mb-5">
        <div className="flex gap-1">
          <label>Show</label>
          <input
            type="text"
            className="text-sm text-center px-2 h-7 w-20 bg-white border border-stone-200 rounded-md focus:ring-1 focus:ring-indigo-900 focus:outline-none"
          />
          <label>entries</label>
        </div>
        <input
          type="text"
          placeholder="Search here..."
          className="h-7 w-40 bg-white border text-sm text-center px-2 border-stone-200 rounded-md focus:ring-1 focus:ring-indigo-900 focus:outline-none"
        />
      </div>
      <div className="relative overflow-auto max-h-96 max-w-full px-5 scrollbar-hide">
        <table className="border-collapse w-full">
          {/* Table Header */}
          <thead className="sticky top-0 z-10 bg-white text-blue-800">
            <tr>
              <th className="min-w-30 px-2 py-2 text-left">Account Name</th>
              <th className="min-w-30 px-2 py-2 text-center">Account Number</th>
              <th className="min-w-30 px-2 py-2 text-center">Balance</th>
              <th className="min-w-30 px-2 py-2 text-center">Equity</th>
              {/* <th className="max-w-24 px-2 py-2 text-center">Drawdown</th> */}
              <th className="min-w-30 px-2 py-2 text-center">Total Withdraw</th>
              <th className="min-w-30 px-2 py-2 text-center">
                Total Profit Daily
              </th>
              <th className="min-w-30 px-2 py-2 text-center">
                Total Profit Weekly
              </th>
              <th className="min-w-30 px-2 py-2 text-center">
                Current Month's Profit
              </th>
              <th className="min-w-30 px-2 py-2 text-center">
                Last Position Time
              </th>
              {/* <th className="min-w-30 px-2 py-2 text-center">Current PnL</th> */}
              <th className="max-w-24 px-2 py-2 text-center">
                Current Open Orders
              </th>
              <th className="max-w-24 px-2 py-2 text-center">
                Current Open Lots
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-stone-100" : "bg-white"
                  } hover:bg-blue-50`}
                >
                  <td className="text-left min-w-30 px-2 py-2 border-y">
                    {row.account_name}
                  </td>
                  <td className="text-center min-w-30 px-2 py-2 border-y">
                    {row.account_number}
                  </td>

                  <td className="text-center min-w-30 px-2 py-2 border-y">
                    {row.balance}
                  </td>
                  <td className="text-center min-w-30 px-2 py-2 border-y">
                    {row.equity}
                  </td>
                  <td className="text-center min-w-30 px-2 py-2 border-y">
                    {row.total_withdraw}
                  </td>
                  {/* <td className="text-center max-w-24 px-2 py-2 border-y">
                    {row.drawdown}
                  </td> */}
                  <td className="text-center min-w-30 px-2 py-2 border-y">
                    {row.total_profit_daily}
                  </td>
                  <td className="text-center min-w-30 px-2 py-2 border-y">
                    {row.total_profit_weekly}
                  </td>
                  <td className="text-center min-w-30 px-2 py-2 border-y">
                    {row.monthly_profit}
                  </td>
                  <td className="text-center min-w-30 px-2 py-2 border-y">
                    {row.last_position_time}
                  </td>
                  {/* <td className="text-center min-w-30 px-2 py-2 border-y">
                    {row.current_pnl}
                  </td> */}
                  <td className="text-center max-w-24 px-2 py-2 border-y">
                    {row.current_open_orders}
                  </td>
                  <td className="text-center max-w-24 px-2 py-2 border-y">
                    {row.current_open_lots}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTable;
