import AppWithoutSSR from './AppWithoutSSR';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <AppWithoutSSR />
    </div>
  );
}
