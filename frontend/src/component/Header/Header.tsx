import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { authedAtom, showLoginModalAtom } from "../../atoms";
import { useAuthRepository } from "../../repository/useAuthRepository";

export default function Header() {
  const [, setShowLoginModal] = useAtom(showLoginModalAtom);
  const [authed, setAuthed] = useAtom(authedAtom);
  const { getAuthStatus } = useAuthRepository();

  useEffect(() => {
    getAuthStatus().then((response) => {
      if (response.success) {
        setAuthed(response.data.authed);
      }
    });
  }, [getAuthStatus]);

  return (
    <header className="w-full bg-blue-400 shadow shadow-blue-600">
      <nav className="flex h-14 justify-between">
        <div className="content-center px-4 py-1.5">
          <Link to="/">
            <img
              className="h-8 rounded shadow-lg"
              src="/ktlog.webp"
              alt="Site Logo"
            />
          </Link>
        </div>
        <div className="p-3">
          {authed ? (
            <button
              className="rounded bg-blue-800 px-1.5 py-1 text-white shadow-2xl hover:bg-blue-700 hover:shadow-xl"
              onClick={() => {}}
            >
              Post
            </button>
          ) : (
            <button
              className="rounded bg-blue-800 px-1.5 py-1 text-white shadow-2xl hover:bg-blue-700 hover:shadow-xl"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
