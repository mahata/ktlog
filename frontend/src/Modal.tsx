import { useEffect } from "react";
import { useAtom } from "jotai";
import { modalAtom } from "./Modal.atoms";

export default function Modal() {
  const [, setShowModal] = useAtom(modalAtom);

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "unset";
    };
  }, []);

  return (
    <>
      <h1>This is going to be a modal window</h1>
      <button onClick={() => setShowModal(false)}>Click me to close</button>
    </>
  );
}
