import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

import LoginPage from "@/pages/login";
import Dashboard from "@/components/Dashboard";
import NotFound from "@/pages/not-found";
import AdminUsersPage from "@/pages/admin-users";

function Router() {
  const sessionId = typeof window !== "undefined" ? localStorage.getItem("sessionId") : null;
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    if (sessionId) {
      fetch("/api/me", { headers: { "x-session-id": sessionId } })
        .then(res => res.json())
        .then(data => setRole(data.role ?? null))
        .catch(() => setRole(null));
    } else {
      setRole(null);
    }
  }, [sessionId]);

  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/admin/users" component={sessionId ? AdminUsersPage : LoginPage} />
      <Route path="/" component={sessionId ? (role === "admin" ? AdminUsersPage : Dashboard) : LoginPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
