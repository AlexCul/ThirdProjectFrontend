import styles from "./Button.module.css";

export default function Button({
  text,
  onClick,
  type = "primary",
  style = {},
}) {
  return (
    <button onClick={onClick} className={styles[type]} style={style}>
      {text}
    </button>
  );
}
