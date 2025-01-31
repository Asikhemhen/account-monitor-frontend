import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const UsersPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionState, setActionState] = useState("");
  const [bgState, setBgState] = useState("");
  const BASE_URL = "https://api.tokaipainel.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/users`);
        if (!response.ok) {
          throw new Error(t("usersPage.error"));
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [BASE_URL, t]);

  if (loading) {
    return <div>{t("usersPage.loading")}</div>;
  }

  if (error) {
    return (
      <div>
        {t("usersPage.error")}: {error}
      </div>
    );
  }

  const handleDelete = async (email) => {
    if (!window.confirm(t("usersPage.confirmDelete"))) return;

    try {
      const response = await fetch(`${BASE_URL}/api/users/${email}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        if (response.status === 404) {
          setActionState(t("usersPage.userNotFound"));
          setBgState("bg-red-200");
        }
        setActionState(t("usersPage.deleteFailed"));
        setBgState("bg-red-200");
      }

      setData((prevData) => prevData.filter((user) => user.email !== email));
      setActionState(t("usersPage.deleteSuccess"));
      setBgState("bg-green-200");

      setTimeout(() => {
        setActionState("");
      }, 3000);
    } catch (err) {
      alert(t("usersPage.error") + ": " + err.message);
      setActionState(t("usersPage.error") + ": " + err.message);
      setBgState("bg-red-200");
    }
  };

  return (
    <div className="h-screen bg-white rounded-lg border shadow-md pt-4 px-5 mt-28 ml-20">
      <h1 className="text-blue-800 text-center sm:text-left text-2xl font-bold mb-4 px-5">
        {t("usersPage.title")}
      </h1>
      {actionState && (
        <div className={`${bgState} ml-5 px-5 py-2`}>{actionState}</div>
      )}
      <div className="relative overflow-auto max-h-96 max-w-full px-5 scrollbar-hide">
        <table className="border-collapse w-full">
          <thead className="sticky top-0 z-10 bg-white text-blue-800">
            <tr>
              <th className="min-w-20 px-2 py-2 text-left">
                {t("usersPage.email")}
              </th>
              <th className="min-w-20 px-2 py-2 text-center">
                {t("usersPage.firstName")}
              </th>
              <th className="min-w-20 px-2 py-2 text-center">
                {t("usersPage.lastName")}
              </th>
              <th className="min-w-20 px-2 py-2 text-center">
                {t("usersPage.rights")}
              </th>
              <th className="min-w-20 px-2 py-2 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-stone-100" : "bg-white"
                  } hover:bg-blue-50 group`}
                >
                  <td className="text-left min-w-20 px-2 py-2 border-y">
                    {row.email}
                  </td>
                  <td className="text-center min-w-20 px-2 py-2 border-y">
                    {row.first_name}
                  </td>
                  <td className="text-center min-w-20 px-2 py-2 border-y">
                    {row.last_name}
                  </td>
                  <td className="text-center min-w-20 px-2 py-2 border-y">
                    {row.user_rights}
                  </td>
                  <td className="text-center min-w-20 px-2 py-2 border-y">
                    <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="bg-red-800 h-7 text-sm text-white px-2 rounded hover:bg-red-900"
                        onClick={() => handleDelete(row.email)}
                      >
                        {t("usersPage.delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  {t("usersPage.noData")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
