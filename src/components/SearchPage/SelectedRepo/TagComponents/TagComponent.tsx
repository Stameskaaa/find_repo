import styles from './tag-component.module.scss';

export const TagComponent: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span className={styles.container}>
      <span>{text}</span>
    </span>
  );
};
