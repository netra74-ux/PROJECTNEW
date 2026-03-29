import { Smartphone } from 'lucide-react';
import styles from './shake-banner.module.css';

interface ShakeBannerProps {
  enabled: boolean;
  onToggle: () => void;
}

export function ShakeBanner({ enabled, onToggle }: ShakeBannerProps) {
  return (
    <button className={`${styles.banner} ${enabled ? styles.active : ''}`} onClick={onToggle}>
      <Smartphone size={16} className={enabled ? styles.shaking : ''} />
      <span>
        <strong>Shake-to-SOS</strong> {enabled ? 'enabled — shake phone vigorously' : 'disabled'}
      </span>
      <span className={styles.toggle}>{enabled ? 'ON' : 'OFF'}</span>
    </button>
  );
}
