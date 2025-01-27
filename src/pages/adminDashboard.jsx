import { useAuth } from "../AuthContext";
import Card from "../components/card";
import equity from "../assets/images/equity.svg";
import accounts from "../assets/images/accounts.svg";
import deposit from "../assets/images/coins.svg";
import withdrawal from "../assets/images/cash.svg";
import lastWeekProfit from "../assets/images/graph-up.svg";
import todaysProfit from "../assets/images/graph-flat.svg";
import totalProfit from "../assets/images/trophy.svg";
import MainTable from "../components/main-table";

const AdminDashboard = () => {
  const { data, loading, error } = useAuth();

  const sumProperty = (array) => {
    return array.reduce((sum, item) => {
      return (
        sum + Object.values(item).reduce((a, b) => a + Number(b), 0) // Convert to number
      );
    }, 0);
  };

  return (
    <section className="flex flex-col pt-4 px-5 mt-28 ml-20 pb-16">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-10">
        <Card
          title="Total Accounts"
          value={data.length}
          img={accounts}
          bg={"bg-orange-500"}
        />
        <Card
          title="Total Equity"
          value={sumProperty(data, "equity")}
          img={equity}
          bg={"bg-green-300"}
        />
        <Card
          title="Total Deposit"
          value={sumProperty(data, "deposit")}
          img={deposit}
          bg={"bg-amber-500"}
        />
        <Card
          title="Total Withdrawal"
          value={sumProperty(data, "total_withdraw")}
          img={withdrawal}
          bg={"bg-blue-400"}
        />
        <Card
          title="Last Week Profit"
          value={sumProperty(data, "total_profit_weekly")}
          img={lastWeekProfit}
          bg={"bg-sky-400"}
        />
        <Card
          title="Today's Profit"
          value={sumProperty(data, "total_profit_daily")}
          img={todaysProfit}
          bg={"bg-pink-400"}
        />
        <Card
          title="Total Profit"
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
