import styles from "./EyeCatch.module.scss";
import { Link } from "react-router-dom";

export default function EyeCatch() {
  return (
    <div className={styles.eyeCatchContainer}>
      <Link to="/">
        <img
          className={styles.eyeCatchLogo}
          src="/profile.webp"
          alt="Eye Catch Logo"
        />
      </Link>
    </div>
  );
}
