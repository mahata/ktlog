import styles from "./EyeCatch.module.scss";

export default function EyeCatch() {
  return (
    <div className={styles.eyeCatchContainer}>
      <img
        className={styles.eyeCatchLogo}
        src="/profile.webp"
        alt="eye-catch-logo"
      />
    </div>
  );
}
