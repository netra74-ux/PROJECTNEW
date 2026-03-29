import { Clock, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { SOSLog } from '~/data/mock-data';
import styles from './emergency-logs.module.css';

interface EmergencyLogsProps {
  logs: SOSLog[];
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

const STATUS_CONFIG = {
  active: { icon: AlertCircle, label: 'Active', color: '#ff1a1a' },
  cancelled: { icon: XCircle, label: 'Cancelled', color: '#ff9500' },
  resolved: { icon: CheckCircle, label: 'Resolved', color: '#00c851' },
} as const;

export function EmergencyLogs({ logs }: EmergencyLogsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Clock size={16} />
        <span>Emergency History</span>
        <span className={styles.count}>{logs.length}</span>
      </div>

      <div className={styles.list}>
        {logs.length === 0 && (
          <div className={styles.empty}>No emergency events recorded</div>
        )}
        {logs.map((log) => {
          const cfg = STATUS_CONFIG[log.status];
          const StatusIcon = cfg.icon;
          return (
            <div key={log.id} className={styles.logCard}>
              <div className={styles.logLeft}>
                <StatusIcon size={20} style={{ color: cfg.color, flexShrink: 0 }} />
              </div>
              <div className={styles.logBody}>
                <div className={styles.logTop}>
                  <span className={styles.logStatus} style={{ color: cfg.color }}>{cfg.label}</span>
                  <span className={styles.logDate}>{formatDate(log.timestamp)}</span>
                </div>
                <div className={styles.logLocation}>
                  <MapPin size={11} />
                  {log.address}
                </div>
                <div className={styles.logMeta}>
                  <span>{log.contactsNotified} contacts notified</span>
                  <span>&bull;</span>
                  <span>{log.duration}s duration</span>
                  <span>&bull;</span>
                  <span className={styles.coords}>
                    {log.latitude.toFixed(4)}, {log.longitude.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
