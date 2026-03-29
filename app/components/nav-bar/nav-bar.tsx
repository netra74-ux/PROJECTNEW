import { NavLink } from 'react-router';
import { Home, Users, Clock, Settings } from 'lucide-react';
import styles from './nav-bar.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/contacts', label: 'Contacts', icon: Users },
  { to: '/logs', label: 'History', icon: Clock },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function NavBar() {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.active : ''}`
          }
        >
          <Icon size={22} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
