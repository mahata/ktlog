import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { UsersRepository } from "./repository/UsersRepository";

type Props = {
  usersRepository: UsersRepository;
};

export default function Header({ usersRepository }: Props) {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    usersRepository.getMe().then((user) => {
      setUsername(user.name ? user.name : "");
    });
  });

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
            <a href="/oauth2/authorization/github">Login</a>
          )}
        </div>
      </nav>
    </header>
  );
}
