import { ArticlesRepository } from "./repository/ArticlesRepository";
import { Mock, vi } from "vitest";
import { UsersRepository } from "./repository/UsersRepository";

export class StubArticlesRepository implements ArticlesRepository {
  getAll: Mock<
    Parameters<ArticlesRepository["getAll"]>,
    ReturnType<ArticlesRepository["getAll"]>
  > = vi.fn();
  get: Mock<
    Parameters<ArticlesRepository["get"]>,
    ReturnType<ArticlesRepository["get"]>
  > = vi.fn();
}

export class StubUsersRepository implements UsersRepository {
  getMe: Mock<
    Parameters<UsersRepository["getMe"]>,
    ReturnType<UsersRepository["getMe"]>
  > = vi.fn();
}
