import logo from "../assets/images/logo.jpg";

const NavTop = () => {
  return (
    <section className="bg-white border-b border-stone-50 shadow-md sticky top-0 z-10">
      <div className="flex justify-between items-center gap-5 mx-5 py-5">
        <img src={logo} alt="logo" className="max-w-40 sm:max-w-44" />
        <button className="text-blue-800 border b-blue-800 w-24 h-10 rounded-md">
          Sign In
        </button>
      </div>
    </section>
  );
};

export default NavTop;
