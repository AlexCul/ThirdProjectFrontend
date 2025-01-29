import styles from "./PostCover.module.css";

export default function PostCover({ post }) {
  return (
    <a onClick={() => {}} className={styles.post}>
      <img src={post.media[0].base64} alt="cover" />
    </a>
  );
}
