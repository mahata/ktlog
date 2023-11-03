import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <nav className={styles.navContainer}>
        <div className={styles.headerLogo}>Logo</div>
        <div className={styles.headerLinkContainer}>
          <Link to="/login">Login</Link>
        </div>
      </nav>
    </header>
  );
}
