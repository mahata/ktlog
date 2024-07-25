import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { showLoginModalAtom, toastMessageAtom } from "../../atoms";
import { X } from "lucide-react";
import { useAuthRepository } from "../../repository/useAuthRepository";

type Props = {
  title: string;
};

export default function LoginModal({ title }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginModal, setShowLoginModal] = useAtom(showLoginModalAtom);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [, setToastMessage] = useAtom(toastMessageAtom);
  const { auth } = useAuthRepository();

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "unset";
    };
  }, []);

  const sendLoginRequest = async () => {
    const authResult = await auth(email, password);
    if (authResult.success) {
      setToastMessage("Login successfully");
      setShowLoginModal(false);
    } else {
      setErrorMessage("Password is wrong");
    }
  };

  return (
    showLoginModal && (
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="absolute inset-0 z-10 bg-slate-400/40" />
        <div className="z-20 w-96 rounded bg-blue-50 p-4 shadow-2xl">
          <div className="flex justify-between">
            <div
              className="pb-3 pt-2 text-xl font-medium leading-5"
              aria-label="login-modal-title"
            >
              {title}
            </div>
            <X size={24} onClick={() => setShowLoginModal(false)} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="content-center" htmlFor="email">
                email
              </label>
              <input
                className="rounded p-1"
                id="email"
                type="text"
                value={email}
                size={24}
                maxLength={256}
                placeholder="Please type your email"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </div>
            <div className="flex justify-between">
              <label className="content-center" htmlFor="password">
                password
              </label>
              <input
                className="rounded p-1"
                id="password"
                type="password"
                value={password}
                size={24}
                maxLength={256}
                placeholder="Please type your password"
                onChange={(event) => setPassword(event.currentTarget.value)}
                onKeyDown={async (event) => {
                  if (event.key === "Enter") {
                    await sendLoginRequest();
                  }
                }}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="rounded bg-blue-800 px-1.5 py-1 text-white shadow-2xl hover:bg-blue-700 hover:shadow-xl"
                onClick={async () => {
                  await sendLoginRequest();
                }}
              >
                Send
              </button>
            </div>
            <div>{errorMessage}</div>
          </div>
        </div>
      </div>
    )
  );
}
