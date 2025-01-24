import Card from "./card";
import equity from "../assets/images/equity.svg";
import accounts from "../assets/images/accounts.svg";
import deposit from "../assets/images/coins.svg";
import withdrawal from "../assets/images/cash.svg";
import lastWeekProfit from "../assets/images/graph-up.svg";
import todaysProfit from "../assets/images/graph-flat.svg";
import adduser from "../assets/images/add-user.svg";
import signout from "../assets/images/sign-out.svg";
import home from "../assets/images/home.svg";
import totalProfit from "../assets/images/trophy.svg";
import settings from "../assets/images/settings.svg";
import line from "../assets/images/line.svg";

import MainTable from "./main-table";

const AccountDetails = () => {
  return (
    <section className="grid grid-cols-12 pb-16">
      <div className="col-span-1 flex flex-col pt-6 justify-start items-center bg-blue-800 max-w-20 min-w-20 sticky top-0 z-0">
        <div className="flex w-12 h-12 py-1 hover:bg-blue-950 hover:cursor-pointer hover:rounded-lg">
          <img src={home} alt="home icon" className="w-full p-3" />
        </div>
        <img src={line} alt="line icon" className="w-10 py-1" />
        <div className="flex w-12 h-12 py-1 hover:bg-blue-950 hover:cursor-pointer hover:rounded-lg">
          <img src={settings} alt="settings icon" className="w-full p-3" />
        </div>
        <img src={line} alt="line icon" className="w-10 py-1" />
        <div className="flex w-12 h-12 py-1 hover:bg-blue-950 hover:cursor-pointer hover:rounded-lg">
          <img src={accounts} alt="accounts icon" className="w-full p-3" />
        </div>
        <img src={line} alt="line icon" className="w-10 py-1" />
        <div className="flex w-12 h-12 py-1 hover:bg-blue-950 hover:cursor-pointer hover:rounded-lg">
          <img src={adduser} alt="add user icon" className="w-full p-3" />
        </div>
        <img src={line} alt="line icon" className="w-10 py-1" />
        <div className="flex w-12 h-12 py-1 hover:bg-blue-950 hover:cursor-pointer hover:rounded-lg">
          <img src={signout} alt="sign out icon" className="w-full p-3" />
        </div>
      </div>
      <div className="col-span-11 flex flex-col pt-4 pr-5 pl-16 sm:pl-8 lg:pl-2">
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
      </div>
    </section>
  );
};

export default AccountDetails;
