import { useSOS } from '~/hooks/use-sos';
import { EmergencyLogs } from '~/components/emergency-logs/emergency-logs';
import { BarChart3, TrendingDown } from 'lucide-react';
import styles from './logs.module.css';

export function meta() {
  return [{ title: 'Emergency History | SafeGuard SOS' }];
}

export default function LogsPage() {
  const { logs } = useSOS();

  const total = logs.length;
  const cancelled = logs.filter((l) => l.status === 'cancelled').length;
  const resolved = logs.filter((l) => l.status === 'resolved').length;
  const avgDuration = total > 0
    ? Math.round(logs.reduce((sum, l) => sum + l.duration, 0) / total)
    : 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <BarChart3 size={20} className={styles.titleIcon} />
          Emergency History
        </h1>
        <p className={styles.subtitle}>All SOS events with timestamps and locations</p>
      </header>

      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNum}>{total}</span>
            <span className={styles.statLabel}>Total Events</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum} style={{ color: 'var(--color-success)' }}>{resolved}</span>
            <span className={styles.statLabel}>Resolved</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum} style={{ color: 'var(--color-warning)' }}>{cancelled}</span>
            <span className={styles.statLabel}>Cancelled</span>
          </div>
          <div className={styles.statCard}>
            <TrendingDown size={14} className={styles.trendIcon} />
            <span className={styles.statNum}>{avgDuration}s</span>
            <span className={styles.statLabel}>Avg Duration</span>
          </div>
        </div>

        <EmergencyLogs logs={logs} />
      </div>
    </div>
  );
}
