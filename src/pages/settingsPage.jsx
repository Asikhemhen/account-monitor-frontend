import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const [visibleAccounts, setVisibleAccounts] = useState([]);
  const [hiddenAccounts, setHiddenAccounts] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false); // Track updates

  const [actionState, setActionState] = useState("");
  const [bgState, setBgState] = useState("");

  const BASE_URL = "https://api.tokaipainel.com";

  useEffect(() => {
    i18n.changeLanguage("pt");

    const fetchAccounts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/account_info`);
        if (!response.ok) {
          throw new Error("Failed to fetch accounts");
        }
        const data = await response.json();

        // Separate visible and hidden accounts
        setVisibleAccounts(
          data.filter((account) => account.show_to_users !== 0)
        );
        setHiddenAccounts(
          data.filter((account) => account.show_to_users === 0)
        );
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, [i18n, BASE_URL, refreshTrigger]); // Re-fetch when refreshTrigger changes

  const handleHideAccount = async (accountNumber) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/account_info/${accountNumber}/hide`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to hide account");
      }

      setRefreshTrigger((prev) => !prev); // Trigger re-fetch
    } catch (error) {
      console.error("Error hiding account:", error);
    }
  };

  const handleShowAccount = async (accountNumber) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/account_info/${accountNumber}/show`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to show account");
      }

      setRefreshTrigger((prev) => !prev); // Trigger re-fetch
    } catch (error) {
      console.error("Error showing account:", error);
    }
  };

  const handleDeleteAccount = async (account_number) => {
    if (!window.confirm(t("settingsPage.confirmDelete"))) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/account_info/${account_number}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setActionState(t("settingsPage.userNotFound"));
          setBgState("bg-red-200");
        }
        setActionState(t("settingsPage.deleteFailed"));
        setBgState("bg-red-200");
      }

      setRefreshTrigger((prev) => !prev);
      setActionState(t("settingsPage.deleteSuccess"));
      setBgState("bg-green-200");

      setTimeout(() => {
        setActionState("");
      }, 3000);
    } catch (err) {
      alert(t("settingsPage.error") + ": " + err.message);
      setActionState(t("settingsPage.error") + ": " + err.message);
      setBgState("bg-red-200");
    }
  };

  const formattedDate = (date_convert) => {
    const date = new Date(date_convert);
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
    <section className="flex flex-col gap-28 pt-4 px-5 mt-28 ml-20 pb-16">
      {/* VISIBLE ACCOUNTS */}
      <div className="bg-white rounded-lg border shadow-md">
        <h1 className="text-blue-800 text-center sm:text-left text-2xl font-bold mb-4 px-5 pt-10">
          {t("settingsPage.accountsDisplayed")}
        </h1>
        {actionState && (
          <div className={`${bgState} ml-5 px-5 py-2`}>{actionState}</div>
        )}
        <div className="relative overflow-auto max-h-96 max-w-full px-5 scrollbar-hide pb-10">
          <table className="border-collapse w-full">
            <thead className="sticky top-0 z-10 bg-white text-blue-800">
              <tr>
                <th className="px-2 py-2 pr-24 text-left">{""}</th>
                <th className="px-2 py-2 text-left">
                  {t("mainTable.tableHeaders.accountName")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.accountNumber")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.balance")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.equity")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.totalWithdraw")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.totalProfitDaily")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.totalProfitWeekly")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.currentMonthsProfit")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.currentOpenOrders")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.currentOpenLots")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.lastPositionTime")}
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleAccounts.length > 0 ? (
                visibleAccounts.map((row, index) => (
                  <tr
                    key={index}
                    className={`relative ${
                      index % 2 === 0 ? "bg-stone-100" : "bg-white"
                    } hover:bg-blue-50 group`}
                  >
                    <td className="px-2 py-2 border-y">
                      <div className="flex flex-col gap-1">
                        <button
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-red-800 h-7 text-xs text-white px-1 rounded hover:bg-red-900 py-1 opacity-0 group-hover:opacity-100 transition"
                          onClick={() => handleHideAccount(row.account_number)}
                        >
                          {t("settingsPage.hide")}
                        </button>
                        <button
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-red-800 h-7 text-xs text-white px-1 rounded hover:bg-red-900 py-1 opacity-0 group-hover:opacity-100 transition"
                          onClick={() =>
                            handleDeleteAccount(row.account_number)
                          }
                        >
                          {t("settingsPage.delete")}
                        </button>
                      </div>
                    </td>
                    <td className="text-left px-2 py-2 border-y">
                      {row.account_name}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.account_number}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.balance}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.equity}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.total_withdraw}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.total_profit_daily}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.total_profit_weekly}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.monthly_profit}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.current_open_orders}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.current_open_lots}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {formattedDate(row.last_position_time)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4">
                    {t("mainTable.noDataAvailable")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* HIDDEN ACCOUNTS */}
      <div className="bg-white rounded-lg border shadow-md">
        <h1 className="text-blue-800 text-center sm:text-left text-2xl font-bold mb-4 px-5 pt-10">
          {t("settingsPage.accountsHidden")}
        </h1>
        {actionState && (
          <div className={`${bgState} ml-5 px-5 py-2`}>{actionState}</div>
        )}
        <div className="relative overflow-auto max-h-96 max-w-full px-5 scrollbar-hide pb-10">
          <table className="border-collapse w-full">
            <thead className="sticky top-0 z-10 bg-white text-blue-800">
              <tr>
                <th className="px-2 py-2 pr-24 text-left">{""}</th>
                <th className="px-2 py-2 text-left">
                  {t("mainTable.tableHeaders.accountName")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.accountNumber")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.balance")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.equity")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.totalWithdraw")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.totalProfitDaily")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.totalProfitWeekly")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.currentMonthsProfit")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.currentOpenOrders")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.currentOpenLots")}
                </th>
                <th className="px-2 py-2 text-center">
                  {t("mainTable.tableHeaders.lastPositionTime")}
                </th>
              </tr>
            </thead>
            <tbody>
              {hiddenAccounts.length > 0 ? (
                hiddenAccounts.map((row, index) => (
                  <tr
                    key={index}
                    className={`relative ${
                      index % 2 === 0 ? "bg-stone-100" : "bg-white"
                    } hover:bg-blue-50 group`}
                  >
                    <td className="px-2 py-2 border-y">
                      <div className="flex flex-col gap-1">
                        <button
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-800 h-7 text-xs text-white px-1 rounded hover:bg-blue-900 py-1 opacity-0 group-hover:opacity-100 transition"
                          onClick={() => handleShowAccount(row.account_number)}
                        >
                          {t("settingsPage.show")}
                        </button>
                        <button
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-red-800 h-7 text-xs text-white px-1 rounded hover:bg-red-900 py-1 opacity-0 group-hover:opacity-100 transition"
                          onClick={() =>
                            handleDeleteAccount(row.account_number)
                          }
                        >
                          {t("settingsPage.delete")}
                        </button>
                      </div>
                    </td>
                    <td className="text-left px-2 py-2 border-y">
                      {row.account_name}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.account_number}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.balance}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.equity}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.total_withdraw}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.total_profit_daily}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.total_profit_weekly}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.monthly_profit}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.current_open_orders}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {row.current_open_lots}
                    </td>
                    <td className="text-center px-2 py-2 border-y">
                      {formattedDate(row.last_position_time)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4">
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

export default SettingsPage;
