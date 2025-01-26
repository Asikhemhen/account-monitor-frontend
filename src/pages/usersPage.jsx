import { useState, useEffect } from "react";

const UsersPage = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionState, setActionState] = useState("");
  const [bgState, setbgState] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result); // Directly set `result` as `data`
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (email) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/users/${email}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        if (response.status === 404) {
          // throw new Error("User not found");
          setActionState("User not found");
          setbgState("bg-red-200");
        }
        // throw new Error("Failed to delete user");
        setActionState("Failed to delete user");
        setbgState("bg-red-200");
      }

      setData((prevData) => prevData.filter((user) => user.email !== email));
      // alert("User deleted successfully");
      setActionState("User deleted successfully");
      setbgState("bg-green-200");

      // Reset actionState after 5 seconds
      setTimeout(() => {
        setActionState(""); // Clear the success message after 5 seconds
      }, 3000);
    } catch (err) {
      alert("Error deleting user: " + err.message);
      setActionState("Error deleting user: " + err.message);
      setbgState("bg-red-200");
    }
  };

  const handleEdit = (user) => {
    const updatedFirstName = prompt(
      "Enter new first name:",
      user.first_name || ""
    );
    const updatedLastName = prompt(
      "Enter new last name:",
      user.last_name || ""
    );

    if (updatedFirstName && updatedLastName) {
      const updatedUser = {
        ...user,
        first_name: updatedFirstName,
        last_name: updatedLastName,
      };

      // Simulate backend update
      setData((prevData) =>
        prevData.map((u) => (u.email === user.email ? updatedUser : u))
      );

      // If backend update is required:
      // updateUserInBackend(user.email, updatedUser);
    }
  };

  return (
    <div className="h-screen bg-white rounded-lg border shadow-md pt-4 px-5 mt-28 ml-20">
      <h1 className="text-blue-800 text-center sm:text-left text-2xl font-bold mb-4 px-5">
        Users
      </h1>
      {actionState && (
        <div className={`${bgState} ml-5 px-5 py-2`}>{actionState}</div>
      )}
      <div className="relative overflow-auto max-h-96 max-w-full px-5 scrollbar-hide">
        <table className="border-collapse w-full">
          {/* Table Header */}
          <thead className="sticky top-0 z-10 bg-white text-blue-800">
            <tr>
              <th className="min-w-20 px-2 py-2 text-left">Email</th>
              <th className="min-w-20 px-2 py-2 text-center">First Name</th>
              <th className="min-w-20 px-2 py-2 text-center">Last Name</th>
              <th className="min-w-20 px-2 py-2 text-center">Rights</th>
              <th className="min-w-20 px-2 py-2 text-center"></th>
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
                      {/* <button
                        className="bg-blue-800 text-white h-7 text-sm px-2 rounded hover:bg-blue-900"
                        onClick={handleEdit}
                      >
                        Edit
                      </button> */}
                      <button
                        className="bg-red-800 h-7 text-sm text-white px-2 rounded hover:bg-red-900"
                        onClick={() => handleDelete(row.email)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No data available
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
