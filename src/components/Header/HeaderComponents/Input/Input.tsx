import styles from './input.module.scss';

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Input: React.FC<Props> = ({ value, setValue }) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={styles.input}
      placeholder="Введите поисковый запрос"
    />
  );
};
