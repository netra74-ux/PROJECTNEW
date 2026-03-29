import { CheckCircle, Send, Clock, Users } from 'lucide-react';
import type { EmergencyContact } from '~/data/mock-data';
import styles from './alert-panel.module.css';

interface AlertPanelProps {
  contacts: EmergencyContact[];
  alertsSent: number;
  elapsedSeconds: number;
  repeatCount: number;
}

export function AlertPanel({ contacts, alertsSent, elapsedSeconds, repeatCount }: AlertPanelProps) {
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.activeBadge}>
          <span className={styles.dot} />
          EMERGENCY ACTIVE
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <Send size={18} />
          <div>
            <span className={styles.statValue}>{alertsSent}</span>
            <span className={styles.statLabel}>Alerts Sent</span>
          </div>
        </div>
        <div className={styles.stat}>
          <Clock size={18} />
          <div>
            <span className={styles.statValue}>{formatTime(elapsedSeconds)}</span>
            <span className={styles.statLabel}>Duration</span>
          </div>
        </div>
        <div className={styles.stat}>
          <Users size={18} />
          <div>
            <span className={styles.statValue}>{contacts.filter((c) => c.notified).length}</span>
            <span className={styles.statLabel}>Contacts</span>
          </div>
        </div>
      </div>

      {repeatCount > 0 && (
        <div className={styles.repeatInfo}>
          🔄 Repeat alert sent {repeatCount}× (every 30s)
        </div>
      )}

      <div className={styles.contacts}>
        {contacts.map((contact) => (
          <div key={contact.id} className={styles.contactRow}>
            <div className={styles.contactInfo}>
              <span className={styles.contactName}>{contact.name}</span>
              <span className={styles.contactPhone}>{contact.phone}</span>
            </div>
            {contact.notified ? (
              <div className={styles.notifiedBadge}>
                <CheckCircle size={14} />
                Notified
              </div>
            ) : (
              <div className={styles.pendingBadge}>Pending</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
