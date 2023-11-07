import { ArticlesRepository } from "./repository/ArticlesRepository";
import { vi } from "vitest";

export class StubArticlesRepository implements ArticlesRepository {
  getAll = vi.fn();
  get = vi.fn();
}
