import React, { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useTranslation } from "react-i18next";

const MainTable = () => {
  const { t, i18n } = useTranslation(); // Initialize translation hook
  const { data, loading, error, role } = useAuth();

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

  return (
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
  );
};

export default MainTable;
