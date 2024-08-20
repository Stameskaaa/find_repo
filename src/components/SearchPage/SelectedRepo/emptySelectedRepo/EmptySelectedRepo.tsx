import styles from './empty-selected-repo.module.scss';

export const EmptySelectedRepo = () => {
  return (
    <div className={styles.container}>
      <p>Выберите репозитарий</p>
    </div>
  );
};
