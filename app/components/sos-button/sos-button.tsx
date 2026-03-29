import { useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import type { SOSState } from '~/hooks/use-sos';
import styles from './sos-button.module.css';

interface SOSButtonProps {
  state: SOSState;
  countdown: number;
  elapsedSeconds: number;
  onTrigger: () => void;
  onCancel: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function SOSButton({ state, countdown, elapsedSeconds, onTrigger, onCancel }: SOSButtonProps) {
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseDown = () => {
    if (state === 'active') {
      longPressRef.current = setTimeout(() => onCancel(), 2000);
    }
  };

  const handleMouseUp = () => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  };

  const isIdle = state === 'idle';
  const isCountdown = state === 'countdown';
  const isActive = state === 'active';
  const isCancelling = state === 'cancelling';

  return (
    <div className={styles.wrapper}>
      {isActive && (
        <>
          <div className={styles.ring1} />
          <div className={styles.ring2} />
          <div className={styles.ring3} />
        </>
      )}

      <button
        className={`${styles.button} ${isActive ? styles.active : ''} ${isCountdown ? styles.countdown : ''} ${isCancelling ? styles.cancelling : ''}`}
        onClick={isIdle || isCountdown ? (isIdle ? onTrigger : onCancel) : undefined}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        aria-label={isActive ? 'Cancel SOS - Long press to stop' : 'Activate SOS Emergency Alert'}
      >
        {isIdle && (
          <>
            <AlertTriangle className={styles.icon} size={48} />
            <span className={styles.label}>SOS</span>
            <span className={styles.sublabel}>Tap to activate</span>
          </>
        )}
        {isCountdown && (
          <>
            <span className={styles.countdownNum}>{countdown}</span>
            <span className={styles.sublabel}>Tap to cancel</span>
          </>
        )}
        {isActive && (
          <>
            <span className={styles.label}>SOS</span>
            <span className={styles.timer}>{formatTime(elapsedSeconds)}</span>
            <span className={styles.sublabel}>Hold 2s to stop</span>
          </>
        )}
        {isCancelling && (
          <>
            <X size={40} className={styles.icon} />
            <span className={styles.sublabel}>Cancelled</span>
          </>
        )}
      </button>

      {isCountdown && (
        <div className={styles.countdownBar}>
          <div
            className={styles.countdownFill}
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
