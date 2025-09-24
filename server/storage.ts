import { type User, type InsertUser, type Client, type InsertClient, type Measurement, type InsertMeasurement } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getClient(id: string): Promise<Client | undefined>;
  getClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;

  getMeasurement(id: string): Promise<Measurement | undefined>;
  getMeasurements(): Promise<Measurement[]>;
  createMeasurement(measurement: InsertMeasurement): Promise<Measurement>;
}
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private clients: Map<string, Client>;
  private measurements: Map<string, Measurement>;

  constructor() {
    this.users = new Map();
    this.clients = new Map();
    this.measurements = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(), 
      role: insertUser.role ?? "contractor"
    };
    this.users.set(id, user);
    return user;
  }

  async getClient(id: string): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = randomUUID();
  const client: Client = { ...insertClient, id, createdAt: new Date() };
    this.clients.set(id, client);
    return client;
  }

  async getMeasurement(id: string): Promise<Measurement | undefined> {
    return this.measurements.get(id);
  }

  async getMeasurements(): Promise<Measurement[]> {
    return Array.from(this.measurements.values());
  }

  async createMeasurement(insertMeasurement: InsertMeasurement): Promise<Measurement> {
    const id = randomUUID();
    const measurement: Measurement = { 
      ...insertMeasurement, 
      id, 
      createdAt: new Date(), 
      type: insertMeasurement.type ?? "Door"
    };
    this.measurements.set(id, measurement);
    return measurement;
  }
}
export const storage = new MemStorage();
