import styles from './button.module.scss';

interface Props {
  onClick: () => void;
}

export const Button: React.FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      ИСКАТЬ
    </button>
  );
};
