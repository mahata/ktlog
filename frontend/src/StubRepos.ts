import { ArticleRepository } from "./repository/ArticleRepository";
import { Mock, vi } from "vitest";
import { UserRepository } from "./repository/UserRepository";

export class StubArticlesRepository implements ArticleRepository {
  getAll: Mock<
    Parameters<ArticleRepository["getAll"]>,
    ReturnType<ArticleRepository["getAll"]>
  > = vi.fn();
  getAllByUname: Mock<
    Parameters<ArticleRepository["getAllByUname"]>,
    ReturnType<ArticleRepository["getAllByUname"]>
  > = vi.fn();
  get: Mock<
    Parameters<ArticleRepository["get"]>,
    ReturnType<ArticleRepository["get"]>
  > = vi.fn();
  save: Mock<
    Parameters<ArticleRepository["save"]>,
    ReturnType<ArticleRepository["save"]>
  > = vi.fn();
}

export class StubUsersRepository implements UserRepository {
  getMe: Mock<
    Parameters<UserRepository["getMe"]>,
    ReturnType<UserRepository["getMe"]>
  > = vi.fn();
  save: Mock<
    Parameters<UserRepository["save"]>,
    ReturnType<UserRepository["save"]>
  > = vi.fn();
}
