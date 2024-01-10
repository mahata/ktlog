import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserRepository } from "./repository/UserRepository";
import { useAtom } from "jotai";
import { modalAtom } from "./Modal.atoms";

type Props = {
  userRepository: UserRepository;
};

export default function Header({ userRepository }: Props) {
  const [, setShowModal] = useAtom(modalAtom);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    userRepository.getMe().then((user) => {
      setUsername(user.uname ? user.uname : "");
    });
  }, [userRepository]);

  return (
    <header className="w-full bg-cyan-100">
      <nav className="flex h-10 justify-between">
        <div className="px-4 py-1.5">
          <Link to="/">
            <img
              className="h-7 rounded shadow-lg"
              src="/ktlog.webp"
              alt="Site Logo"
            />
          </Link>
        </div>
        <div className="p-3">
          {username ? (
            username
          ) : (
            <button onClick={() => setShowModal(true)}>Login</button>
          )}
        </div>
      </nav>
    </header>
  );
}
