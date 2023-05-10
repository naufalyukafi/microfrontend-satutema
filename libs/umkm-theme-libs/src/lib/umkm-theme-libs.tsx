import styles from './umkm-theme-libs.module.css';
/* eslint-disable-next-line */
export interface UmkmThemeLibsProps {}

export function UmkmThemeLibs(props: UmkmThemeLibsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UmkmThemeLibs!</h1>
    </div>
  );
}

export default UmkmThemeLibs;
