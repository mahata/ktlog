import { ArticleRepository } from "./repository/ArticleRepository";
import { Mock, vi } from "vitest";
import { UserRepository } from "./repository/UserRepository";

export class StubArticlesRepository implements ArticleRepository {
  getAll: Mock<
    Parameters<ArticleRepository["getAll"]>,
    ReturnType<ArticleRepository["getAll"]>
  > = vi.fn();
  get: Mock<
    Parameters<ArticleRepository["get"]>,
    ReturnType<ArticleRepository["get"]>
  > = vi.fn();
}

export class StubUsersRepository implements UserRepository {
  getMe: Mock<
    Parameters<UserRepository["getMe"]>,
    ReturnType<UserRepository["getMe"]>
  > = vi.fn();
}
