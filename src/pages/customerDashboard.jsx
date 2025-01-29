import Card from "../components/card";
import equity from "../assets/images/equity.svg";
import accounts from "../assets/images/accounts.svg";
import deposit from "../assets/images/coins.svg";
import withdrawal from "../assets/images/cash.svg";
import lastWeekProfit from "../assets/images/graph-up.svg";
import todaysProfit from "../assets/images/graph-flat.svg";
import totalProfit from "../assets/images/trophy.svg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

const CustomerDashboard = () => {
  const { data, loading, error } = useAuth();
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const sumProperty = (array, key) => {
    const sum = array.reduce((sum, item) => sum + Number(item[key] || 0), 0);
    return sum.toFixed(2);
  };

  useEffect(() => {
    i18n.changeLanguage("pt"); // Set default language to Portuguese
  }, [i18n]); // The empty dependency array ensures this only runs once on mount

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (error) {
    return (
      <div>
        {t("error")}: {error}
      </div>
    );
  }

  const formattedDate = (date_convert) => {
    const isoDate = date_convert;
    const date = new Date(isoDate);

    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0") +
      " " +
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0") +
      ":" +
      String(date.getSeconds()).padStart(2, "0")
    );
  };

  const visibleAccount = data.filter((account) => account.show_to_users === 1);

  // Filter data based on search query (account name & number)
  const filteredData = visibleAccount.filter(
    (row) =>
      row.account_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.account_number.toString().includes(searchQuery)
  );

  return (
    <section className="flex flex-col pt-4 px-5 mt-28 ml-20 pb-16">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-10">
        <Card
          title={t("adminDashboard.totalAccounts")}
          value={visibleAccount.length}
          img={accounts}
          bg={"bg-orange-500"}
        />
        <Card
          title={t("adminDashboard.totalEquity")}
          value={sumProperty(visibleAccount, "equity")}
          img={equity}
          bg={"bg-green-300"}
        />
        <Card
          title={t("adminDashboard.totalDeposit")}
          value={sumProperty(visibleAccount, "deposit")}
          img={deposit}
          bg={"bg-amber-500"}
        />
        <Card
          title={t("adminDashboard.totalWithdrawal")}
          value={sumProperty(visibleAccount, "total_withdraw")}
          img={withdrawal}
          bg={"bg-blue-400"}
        />
        <Card
          title={t("adminDashboard.lastWeekProfit")}
          value={sumProperty(visibleAccount, "total_profit_weekly")}
          img={lastWeekProfit}
          bg={"bg-sky-400"}
        />
        <Card
          title={t("adminDashboard.todaysProfit")}
          value={sumProperty(visibleAccount, "total_profit_daily")}
          img={todaysProfit}
          bg={"bg-pink-400"}
        />
        <Card
          title={t("adminDashboard.totalProfit")}
          value={sumProperty(visibleAccount, "total_profit_daily")}
          img={totalProfit}
          bg={"bg-green-600"}
        />
      </section>
      <div className="bg-white rounded-lg border shadow-md pt-5">
        <h1 className="text-blue-800 text-center sm:text-left text-2xl font-bold mb-4 px-5">
          {t("mainTable.accountDetails")}
        </h1>
        <div className="flex flex-col sm:flex-row justify-between basis-auto items-center gap-2 px-5 mb-5">
          <div className="flex gap-1">
            <label>{t("mainTable.show")}</label>
            <input
              type="text"
              className="text-sm text-center px-2 h-7 w-20 bg-white border border-stone-200 rounded-md focus:ring-1 focus:ring-indigo-900 focus:outline-none"
            />
            <label>{t("mainTable.entries")}</label>
          </div>
          <input
            type="text"
            placeholder={t("mainTable.searchPlaceholder")}
            className="h-7 w-40 bg-white border text-sm text-center px-2 border-stone-200 rounded-md focus:ring-1 focus:ring-indigo-900 focus:outline-none"
          />
        </div>
        <div className="relative overflow-auto max-h-96 max-w-full px-5 scrollbar-hide">
          <table className="border-collapse w-full">
            {/* Table Header */}
            <thead className="sticky top-0 z-10 bg-white text-blue-800">
              <tr>
                <th className="min-w-30 px-2 py-2 text-left">
                  {t("mainTable.tableHeaders.accountName")}
                </th>
                <th className="min-w-30 px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.accountNumber")}
                </th>
                <th className="min-w-30 px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.balance")}
                </th>
                <th className="min-w-30 px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.equity")}
                </th>
                <th className="min-w-30 px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.totalWithdraw")}
                </th>
                <th className="min-w-30 px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.totalProfitDaily")}
                </th>
                <th className="min-w-30 px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.totalProfitWeekly")}
                </th>
                <th className="min-w-30 px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.currentMonthsProfit")}
                </th>
                <th className="max-w-24 px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.currentOpenOrders")}
                </th>
                <th className="max-w-24 px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.currentOpenLots")}
                </th>
                <th className="min-w-30 px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.lastPositionTime")}
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
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
                    <td className="text-center min-w-30 px-2 py-2 border-y">
                      {row.total_profit_daily}
                    </td>
                    <td className="text-center min-w-30 px-2 py-2 border-y">
                      {row.total_profit_weekly}
                    </td>
                    <td className="text-center min-w-30 px-2 py-2 border-y">
                      {row.monthly_profit}
                    </td>
                    <td className="text-center max-w-24 px-2 py-2 border-y">
                      {row.current_open_orders}
                    </td>
                    <td className="text-center max-w-24 px-2 py-2 border-y">
                      {row.current_open_lots}
                    </td>
                    <td className="text-center min-w-30 px-2 py-2 border-y">
                      {formattedDate(row.last_position_time)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center py-4">
                    {t("mainTable.noDataAvailable")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CustomerDashboard;
