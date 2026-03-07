import { type Waitlist, type InsertWaitlist } from "@shared/schema";

export interface IStorage {
  createWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
}

export class MemStorage implements IStorage {
  private waitlist: Map<number, Waitlist>;
  private currentId: number;

  constructor() {
    this.waitlist = new Map();
    this.currentId = 1;
  }

  async createWaitlist(insertWaitlist: InsertWaitlist): Promise<Waitlist> {
    const id = this.currentId++;
    const entry: Waitlist = { ...insertWaitlist, id };
    this.waitlist.set(id, entry);
    return entry;
  }
}

export const storage = new MemStorage();
