import { useEffect } from "react";
import { useAtom } from "jotai";
import { loginModalAtom } from "./LoginModal.atoms";
import { X } from "lucide-react";

type Props = {
  title: string;
};

export default function LoginModal({ title }: Props) {
  const [, setShowModal] = useAtom(loginModalAtom);

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 z-10 bg-slate-400/40" />
      <div className="z-20 w-96 rounded-xl bg-blue-50 p-4 shadow-2xl">
        <div className="flex justify-between">
          <div className="pb-3 pt-2 text-xl font-medium leading-5" aria-label="login-modal-title">{title}</div>
          <X size={24} onClick={() => setShowModal(false)}/>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label className="content-center" htmlFor="username">username</label>
            <input className="rounded-l p-1" id="username" type="text" size={24} maxLength={256} placeholder="Please type your username"/>
          </div>
          <div className="flex justify-between">
            <label className="content-center" htmlFor="password">password</label>
            <input className="rounded-l p-1" id="password" type="text" size={24} maxLength={256} placeholder="Please type your password"/>
          </div>
        </div>
      </div>
    </div>
  );
}
