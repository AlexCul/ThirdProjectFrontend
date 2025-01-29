import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles.links}>
        <a href="/">Home</a>
        <a onClick={() => {}}>Search</a>
        <a href="/explore">Explore</a>
        <a onClick={() => {}}>Notifications</a>
        <a onClick={() => {}}>Create</a>
      </div>
      <p>© 2024 ICHgram</p>
    </footer>
  );
}
