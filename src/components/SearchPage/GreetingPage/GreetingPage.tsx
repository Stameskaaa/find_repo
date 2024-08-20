import styles from './greeting-page.module.scss';

export const GreetingPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.greeting}>Добро пожаловать</p>
    </div>
  );
};
