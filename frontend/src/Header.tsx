import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
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
          <a href="/oauth2/authorization/github">Login</a>
        </div>
      </nav>
    </header>
  );
}
