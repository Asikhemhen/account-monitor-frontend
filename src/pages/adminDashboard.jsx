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
  return (
    <section className="flex flex-col pt-4 px-5 mt-28 ml-20 pb-16">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-10">
        <Card
          title="Total Accounts"
          value={6723.36}
          img={accounts}
          bg={"bg-orange-500"}
        />
        <Card
          title="Total Equity"
          value={6723.36}
          img={equity}
          bg={"bg-green-300"}
        />
        <Card
          title="Total Deposit"
          value={6723.36}
          img={deposit}
          bg={"bg-amber-500"}
        />
        <Card
          title="Total Withdrawal"
          value={6723.36}
          img={withdrawal}
          bg={"bg-blue-400"}
        />
        <Card
          title="Last Week Profit"
          value={6723.36}
          img={lastWeekProfit}
          bg={"bg-sky-400"}
        />
        <Card
          title="Today's Profit"
          value={6723.36}
          img={todaysProfit}
          bg={"bg-pink-400"}
        />
        <Card
          title="Total Profit"
          value={6723.36}
          img={totalProfit}
          bg={"bg-green-600"}
        />
      </section>
      <MainTable />
    </section>
  );
};

export default AdminDashboard;
