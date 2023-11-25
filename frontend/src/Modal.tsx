import { useEffect } from "react";

export default function Modal() {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "unset";
    };
  }, []);

  return <div>This is going to be a modal window</div>;
}
