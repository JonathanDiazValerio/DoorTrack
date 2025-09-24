// ...existing imports...
import { randomUUID } from "crypto";
import { createServer } from "http";
import type { Express, Request, Response, NextFunction } from "express";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<import('http').Server> {
  // Simple session emulation (for demo, use real session/cookie in production)
  const sessions = new Map<string, string>(); // sessionId -> userId

  function requireAuth(req: Request & { userId?: string }, res: Response, next: NextFunction) {
    const sessionId = req.headers["x-session-id"] as string | undefined;
    if (!sessionId || !sessions.has(sessionId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.userId = sessions.get(sessionId) ?? "";
    next();
  }

  function requireAdmin(req: Request & { userId?: string }, res: Response, next: NextFunction) {
    const sessionId = req.headers["x-session-id"] as string | undefined;
    if (!sessionId || !sessions.has(sessionId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = sessions.get(sessionId);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    storage.getUser(userId).then(user => {
      if (user?.role !== "admin") {
        return res.status(403).json({ error: "Forbidden" });
      }
      req.userId = userId;
      next();
    });
  }

  // Example: get clients for current user (or all for admin)
  app.get("/api/clients", requireAuth, async (req: Request & { userId?: string }, res: Response) => {
    const user = await storage.getUser(req.userId ?? "");
    if (!user) return res.status(404).json({ error: "User not found" });
    let clients = await storage.getClients();
    if (user.role !== "admin") {
      clients = clients.filter((c: any) => c.userId === user.id);
    }
    res.json(clients);
  });

  // Example: get measurements for current user's clients (or all for admin)
  app.get("/api/measurements", requireAuth, async (req: Request & { userId?: string }, res: Response) => {
    const user = await storage.getUser(req.userId ?? "");
    if (!user) return res.status(404).json({ error: "User not found" });
    let measurements = await storage.getMeasurements();
    if (user.role !== "admin") {
      // Only measurements for user's clients
      const clients = (await storage.getClients()).filter((c: any) => c.userId === user.id).map((c: any) => c.id);
      measurements = measurements.filter((m: any) => clients.includes(m.clientId));
    }
    res.json(measurements);
  });
  // Ensure admin user exists
  const adminUser = await storage.getUserByUsername("admin");
  if (!adminUser) {
    await storage.createUser({
      username: "admin",
      password: "password123", // TODO: hash in production
      role: "admin"
    });
  }

  // Register route
  app.post("/api/register", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }
    const existing = await storage.getUserByUsername(username);
    if (existing) {
      return res.status(409).json({ error: "Username already exists" });
    }
    const user = await storage.createUser({ username, password, role: "contractor" });
    res.status(201).json({ id: user.id, username: user.username, role: user.role });
  });

  // Login route
  app.post("/api/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }
    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Create a session (use real session/cookie in production)
    const sessionId = randomUUID();
    sessions.set(sessionId, user.id);
    res.json({ id: user.id, username: user.username, role: user.role, sessionId });
  });
  // Example: get current user info
  app.get("/api/me", requireAuth, async (req: Request & { userId?: string }, res: Response) => {
    const user = await storage.getUser(req.userId ?? "");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ id: user.id, username: user.username, role: user.role });
  });

  // Example: admin can list all users
  app.get("/api/users", requireAdmin, async (req: Request, res: Response) => {
    // For demo, return all users in memory
    const allUsers = Array.from(storage["users"].values()).map(u => ({ id: u.id, username: u.username, role: u.role }));
    res.json(allUsers);
  });

  // Example: admin can update user credentials
  app.put("/api/users/:id", requireAdmin, async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    const user = await storage.getUser(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (username) user.username = username;
    if (password) user.password = password;
    if (role) user.role = role;
    storage["users"].set(user.id, user);
    res.json({ id: user.id, username: user.username, role: user.role });
  });

  const httpServer = createServer(app);
  return httpServer;
}
