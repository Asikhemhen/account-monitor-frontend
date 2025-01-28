import { useAuth } from "../AuthContext";
import { useEffect } from "react";
import Card from "../components/card";
import equity from "../assets/images/equity.svg";
import accounts from "../assets/images/accounts.svg";
import deposit from "../assets/images/coins.svg";
import withdrawal from "../assets/images/cash.svg";
import lastWeekProfit from "../assets/images/graph-up.svg";
import todaysProfit from "../assets/images/graph-flat.svg";
import totalProfit from "../assets/images/trophy.svg";
import { useTranslation } from "react-i18next";
import MainTable from "../components/main-table";

const AdminDashboard = () => {
  const { t, i18n } = useTranslation();
  const { data, loading, error } = useAuth();

  const sumProperty = (array, key) => {
    const sum = array.reduce((sum, item) => sum + Number(item[key] || 0), 0);
    return sum.toFixed(2);
  };

  useEffect(() => {
    i18n.changeLanguage("pt"); // Set default language to Portuguese
  }, [i18n]); // The empty dependency array ensures this only runs once on mount

  return (
    <section className="flex flex-col pt-4 px-5 mt-28 ml-20 pb-16">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-10">
        <Card
          title={t("adminDashboard.totalAccounts")}
          value={data.length}
          img={accounts}
          bg={"bg-orange-500"}
        />
        <Card
          title={t("adminDashboard.totalEquity")}
          value={sumProperty(data, "equity")}
          img={equity}
          bg={"bg-green-300"}
        />
        <Card
          title={t("adminDashboard.totalDeposit")}
          value={sumProperty(data, "deposit")}
          img={deposit}
          bg={"bg-amber-500"}
        />
        <Card
          title={t("adminDashboard.totalWithdrawal")}
          value={sumProperty(data, "total_withdraw")}
          img={withdrawal}
          bg={"bg-blue-400"}
        />
        <Card
          title={t("adminDashboard.lastWeekProfit")}
          value={sumProperty(data, "total_profit_weekly")}
          img={lastWeekProfit}
          bg={"bg-sky-400"}
        />
        <Card
          title={t("adminDashboard.todaysProfit")}
          value={sumProperty(data, "total_profit_daily")}
          img={todaysProfit}
          bg={"bg-pink-400"}
        />
        <Card
          title={t("adminDashboard.totalProfit")}
          value={sumProperty(data, "total_profit_daily")}
          img={totalProfit}
          bg={"bg-green-600"}
        />
      </section>
      <MainTable />
    </section>
  );
};

export default AdminDashboard;
