import styles from './blue-tag-component.module.scss';

export const BlueTagComponent: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span className={styles.container}>
      <span>{text}</span>
    </span>
  );
};
