import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "wouter";

interface User {
  id: string;
  username: string;
  role: string;
}
export default function AdminUsersPage() {
  const [newUser, setNewUser] = useState<{ username: string; password: string; role: string }>({ username: "", password: "", role: "contractor" });
  const [addError, setAddError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<{ username: string; password: string; role: string }>({ username: "", password: "", role: "contractor" });
  const [error, setError] = useState("");
  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    fetch("/api/users", { headers: { "x-session-id": sessionId ?? "" } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setError(typeof data.error === "string" ? data.error : "Unexpected response from server");
          setUsers([]);
        }
      })
      .catch(() => {
        setError("Failed to fetch users");
        setUsers([]);
      });
  }, [sessionId]);

  const startEdit = (user: User) => {
    setEditing(user.id);
    setForm({ username: user.username, password: "", role: user.role });
    setError("");
  };

  const cancelEdit = () => {
    setEditing(null);
    setError("");
  };

  const saveEdit = async () => {
    setError("");
    const res = await fetch(`/api/users/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-session-id": sessionId ?? "" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      setUsers(users.map(u => (u.id === editing ? { ...u, ...data } : u)));
      setEditing(null);
    } else {
      setError(data.error || "Update failed");
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    if (!newUser.username || !newUser.password) {
      setAddError("Username and password required");
      return;
    }
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-session-id": sessionId ?? "" },
      body: JSON.stringify(newUser)
    });
    const data = await res.json();
    if (res.ok) {
      setUsers([...users, { id: data.id, username: data.username, role: data.role }]);
      setNewUser({ username: "", password: "", role: "contractor" });
    } else {
      setAddError(data.error || "Failed to add user");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const res = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
      headers: { "x-session-id": sessionId ?? "" }
    });
    if (res.ok) {
      setUsers(users.filter(u => u.id !== userId));
    } else {
      const data = await res.json();
      setError(data.error || "Failed to delete user");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <button
            className="bg-gray-200 px-3 py-1 rounded text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700"
            onClick={() => {
              localStorage.removeItem("sessionId");
              window.location.href = "/login";
            }}
          >Logout</button>
        </div>
      </div>
      <form className="mb-6 bg-white dark:bg-gray-900 p-4 rounded shadow grid grid-cols-1 md:grid-cols-4 gap-4 items-end" onSubmit={handleAddUser}>
        <input
          className="border p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={e => setNewUser(u => ({ ...u, username: e.target.value }))}
        />
        <input
          className="border p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={e => setNewUser(u => ({ ...u, password: e.target.value }))}
        />
        <select
          className="border p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
          value={newUser.role}
          onChange={e => setNewUser(u => ({ ...u, role: e.target.value }))}
        >
          <option value="contractor">Contractor</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto" type="submit">Add User</button>
        {addError && <div className="text-red-500 col-span-4">{addError}</div>}
      </form>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="w-full border mb-6">
        <thead>
          <tr>
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && error && (
            <tr>
              <td colSpan={3} className="text-red-500 p-2">{error}</td>
            </tr>
          )}
          {users.map(user => (
            <tr key={user.id}>
              <td className="border p-2">
                {editing === user.id ? (
                  <input
                    className="border p-1 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
                    value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                    placeholder="Username"
                    title="Username"
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="border p-2">
                {editing === user.id ? (
                  <select
                    className="border p-1 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
                    value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    title="Role"
                  >
                    <option value="contractor">Contractor</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="border p-2">
                {editing === user.id ? (
                  <>
                    <input
                      className="border p-1 mr-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
                      type="password"
                      placeholder="New password"
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    />
                    <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={saveEdit}>Save</button>
                    <button className="bg-gray-400 text-white px-2 py-1 rounded mr-2" onClick={cancelEdit}>Cancel</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </>
                ) : (
                  <>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded mr-2" onClick={() => startEdit(user)}>Edit</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="text-red-500 mb-4">{error}</div>}
    </div>
  );
}
