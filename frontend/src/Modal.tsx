import { useEffect } from "react";
import { useAtom } from "jotai";
import { modalAtom } from "./Modal.atoms";
import { X } from "lucide-react";

type Props = {
  title: string;
};

export default function Modal({ title }: Props) {
  const [, setShowModal] = useAtom(modalAtom);

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 z-10 bg-slate-400/40" />
      <div className="z-20 w-4/5 rounded-3xl bg-blue-50 p-4 shadow-2xl">
        <div className="flex justify-between">
          <div className="pb-3 pt-2 text-xl font-medium leading-5">{title}</div>
          <X size={24} onClick={() => setShowModal(false)} />
        </div>
        <div>
          <div className="rounded-2xl bg-blue-100 p-2">
            <a
              className="flex items-center gap-4"
              href="/oauth2/authorization/github"
            >
              <img className="h-8 w-8" src="/github.webp" alt="GitHub Logo" />
              <p>Login with GitHub</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
