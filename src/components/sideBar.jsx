import accounts from "../assets/images/accounts.svg";
import adduser from "../assets/images/add-user.svg";
import signout from "../assets/images/sign-out.svg";
import home from "../assets/images/home.svg";
import settings from "../assets/images/settings.svg";
import line from "../assets/images/line.svg";
import { useAuth } from "../AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const { userRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="flex flex-col pt-8 justify-start items-center bg-blue-800 h-full max-w-20 min-w-20 fixed top-20 z-20">
      {userRole === "admin" ? (
        <>
          <Link to="/">
            <div
              className={`flex w-12 h-12 py-1 ${
                location.pathname === "/admin/dashboard"
                  ? "bg-blue-950 rounded-lg"
                  : "bg-transparent"
              } hover:bg-blue-950 hover:cursor-pointer hover:rounded-lg`}
            >
              <img src={home} alt="home icon" className="w-full p-3" />
            </div>
          </Link>
          <img src={line} alt="line icon" className="w-10 py-1" />
          <Link to="/admin/settings">
            <div
              className={`flex w-12 h-12 py-1 ${
                location.pathname === "/admin/settings"
                  ? "bg-blue-950 rounded-lg"
                  : "bg-transparent"
              } hover:bg-blue-950 hover:cursor-pointer hover:rounded-lg`}
            >
              <img src={settings} alt="settings icon" className="w-full p-3" />
            </div>
          </Link>
          <img src={line} alt="line icon" className="w-10 py-1" />
          <Link to="/admin/users">
            <div
              className={`flex w-12 h-12 py-1 ${
                location.pathname === "/admin/users"
                  ? "bg-blue-950 rounded-lg"
                  : "bg-transparent"
              } hover:bg-blue-950 hover:cursor-pointer hover:rounded-lg`}
            >
              <img src={accounts} alt="accounts icon" className="w-full p-3" />
            </div>
          </Link>
          <img src={line} alt="line icon" className="w-10 py-1" />
          <Link to="/admin/add-user">
            <div
              className={`flex w-12 h-12 py-1 ${
                location.pathname === "/admin/add-user"
                  ? "bg-blue-950 rounded-lg"
                  : "bg-transparent"
              }  hover:bg-blue-950 hover:cursor-pointer hover:rounded-lg`}
            >
              <img src={adduser} alt="add user icon" className="w-full p-3" />
            </div>
          </Link>
          <img src={line} alt="line icon" className="w-10 py-1" />
          <Link to="/login">
            <div
              className={`flex w-12 h-12 py-1 ${
                location.pathname === "/admin/login"
                  ? "bg-blue-950 rounded-lg"
                  : "bg-transparent"
              }  hover:bg-blue-950 hover:cursor-pointer hover:rounded-lg`}
              onMouseDown={handleLogout}
            >
              <img src={signout} alt="sign out icon" className="w-full p-3" />
            </div>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <div
            className="flex w-12 h-12 py-1 hover:bg-blue-950 hover:cursor-pointer hover:rounded-lg"
            onMouseDown={handleLogout}
          >
            <img src={signout} alt="sign out icon" className="w-full p-3" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default SideBar;
