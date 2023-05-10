import styles from './header1.module.css';

/* eslint-disable-next-line */
export interface Header1Props {}

export function Header1(props: Header1Props) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Header from umkm theme!</h1>
    </div>
  );
}

export default Header1;
