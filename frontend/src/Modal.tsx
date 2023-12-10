import { useEffect } from "react";
import { useAtom } from "jotai";
import { modalAtom } from "./Modal.atoms";
import styles from "./Modal.module.scss";
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
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <X size={24} onClick={() => setShowModal(false)} />
        </div>
        <div className={styles.body}>
          <div className={styles.socialLogin}>
            <a
              className={styles.socialLoginLink}
              href="/oauth2/authorization/github"
            >
              <img
                className={styles.socialLoginIcon}
                src="/github.webp"
                alt="GitHub Logo"
              />
              <div className={styles.socialLoginText}>Login with GitHub</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
