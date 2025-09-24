import { Ruler } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";

export default function Header() {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetch("/api/me", { headers: { "x-session-id": sessionId } })
        .then(res => res.json())
        .then(data => setRole(data.role ?? null))
        .catch(() => setRole(null));
    } else {
      setRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
    window.location.href = "/login";
  };

  return (
    <header className="border-b bg-card p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-md">
          <Ruler className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-medium text-foreground" data-testid="text-app-title">
            Client Measurements
          </h1>
          <p className="text-sm text-muted-foreground">
            Track door & window measurements
          </p>
        </div>
      </div>
      <nav className="flex gap-4 items-center">
        <Link href="/">Dashboard</Link>
        {role === "admin" && <Link href="/admin/users">Admin</Link>}
        {role ? (
          <button className="ml-2 bg-gray-200 px-2 py-1 rounded" onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
