import { Battery, BatteryCharging, Wifi, WifiOff, MapPin } from 'lucide-react';
import { useBattery } from '~/hooks/use-battery';
import styles from './status-bar.module.css';

interface StatusBarProps {
  isOnline: boolean;
  hasLocation: boolean;
}

export function StatusBar({ isOnline, hasLocation }: StatusBarProps) {
  const battery = useBattery();
  const pct = Math.round(battery.level * 100);
  const isLow = pct <= 20;
  const isCritical = pct <= 5;

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <div className={`${styles.indicator} ${isOnline ? styles.online : styles.offline}`}>
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
        <div className={`${styles.indicator} ${hasLocation ? styles.online : styles.offline}`}>
          <MapPin size={14} />
          <span>{hasLocation ? 'GPS Active' : 'No GPS'}</span>
        </div>
      </div>

      <div className={styles.right}>
        {isCritical && <span className={styles.criticalBattery}>⚡ LOW BATTERY</span>}
        <div className={`${styles.batteryWrap} ${isLow ? styles.batteryLow : ''}`}>
          {battery.charging ? <BatteryCharging size={16} /> : <Battery size={16} />}
          <span>{pct}%</span>
        </div>
      </div>
    </div>
  );
}
