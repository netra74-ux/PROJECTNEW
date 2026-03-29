import { Outlet } from 'react-router';
import { NavBar } from '~/components/nav-bar/nav-bar';
import styles from './app-layout.module.css';

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
}
