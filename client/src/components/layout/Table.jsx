import { useState, useEffect } from "react";
import { getUsers } from "../../Services/api";

export default function Table() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded w-1/3"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create New
        </button>
      </div>
      <table className="w-full bg-blue-100 rounded">
        <thead>
          <tr className="text-left">
            <th className="p-2">No.</th>
            <th className="p-2">Registration_ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Date created</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{user.registrationId}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.dateCreated}</td>
              <td className="p-2">
                <button className="text-blue-600 hover:underline mr-2">
                  Edit
                </button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
