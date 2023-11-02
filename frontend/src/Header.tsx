import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLogo}>Logo</div>
      <div className={styles.headerLinkContainer}>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
