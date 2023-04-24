import styles from "./Div.module.css";

export const Div = ({ errors, children }: any) => {
  return <div className={errors && styles.error}>{children}</div>;
};
