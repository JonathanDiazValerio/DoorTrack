import { useState } from "react";

export default function LoginPage(_: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("sessionId", data.sessionId);
      window.location.href = "/";
    } else {
      setError(data.error || "Login failed");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="bg-white p-8 rounded shadow w-80" onSubmit={handleSubmit}>
  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-black">Sign In</h2>
        <input
          className="border p-2 w-full mb-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
  <button className="bg-blue-600 text-white px-4 py-2 rounded w-full dark:bg-blue-700" type="submit">Login</button>
      </form>
    </div>
  );
}
