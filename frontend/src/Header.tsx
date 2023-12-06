import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { UsersRepository } from "./repository/UsersRepository";
import { useAtom } from "jotai";
import { modalAtom } from "./Modal.atoms";

type Props = {
  usersRepository: UsersRepository;
};

export default function Header({ usersRepository }: Props) {
  const [, setShowModal] = useAtom(modalAtom);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    usersRepository.getMe().then((user) => {
      setUsername(user.name ? user.name : "");
    });
  }, [usersRepository]);

  return (
    <header className={styles.headerContainer}>
      <nav className={styles.navContainer}>
        <div className={styles.headerLogo}>
          <Link to="/">
            <img
              className={styles.headerLogoImage}
              src="/ktlog.webp"
              alt="Site Logo"
            />
          </Link>
        </div>
        <div className={styles.headerLinkContainer}>
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
