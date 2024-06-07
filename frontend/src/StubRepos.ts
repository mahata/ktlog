import { Mock, vi } from "vitest";
import { UserRepository } from "./repository/UserRepository";

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
