import { useEffect } from "react";
import { useAtom } from "jotai";
import { modalAtom } from "./Modal.atoms";

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
    <>
      <h1>{title}</h1>
      <button onClick={() => setShowModal(false)}>Click me to close</button>
    </>
  );
}
