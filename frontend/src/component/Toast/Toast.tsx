import "../../css/animation.css";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { toastMessageAtom } from "./Toast.atoms";

interface CustomCSSProperties extends React.CSSProperties {
  "--animation-duration"?: string | number;
}

const duration = 6_000;

export default function Toast() {
  const [toastMessage, setToastMessage] = useAtom(toastMessageAtom);

  useEffect(() => {
    const timeoutId = setTimeout(() => setToastMessage(""), duration);

    return () => clearTimeout(timeoutId);
  }, [setToastMessage]);

  return (
    0 < toastMessage.length && (
      <div className="absolute bottom-1 right-1 flex min-h-10 w-96 flex-col justify-between overflow-hidden rounded bg-cyan-400">
        <div className="p-4 text-white">{toastMessage}</div>
        <div
          className="toShort h-1 bg-gray-400 opacity-90"
          style={
            {
              "--animation-duration": `${duration}ms`,
            } as CustomCSSProperties
          }
        ></div>
      </div>
    )
  );
}
