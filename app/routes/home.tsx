import { useState, useCallback } from 'react';
import { Shield } from 'lucide-react';
import { useColorScheme } from '@dazl/color-scheme/react';
import { SOSButton } from '~/components/sos-button/sos-button';
import { StatusBar } from '~/components/status-bar/status-bar';
import { AlertPanel } from '~/components/alert-panel/alert-panel';
import { MapView } from '~/components/map-view/map-view';
import { ShakeBanner } from '~/components/shake-banner/shake-banner';
import { useSOS, useLocation } from '~/hooks/use-sos';
import { useShakeDetection } from '~/hooks/use-shake';
import styles from './home.module.css';

export function meta() {
  return [{ title: 'Emergency SOS' }, { name: 'description', content: 'One-tap emergency safety system' }];
}

export default function HomePage() {
  const [shakeEnabled, setShakeEnabled] = useState(false);
  const [isOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const { resolvedScheme, setColorScheme, configScheme } = useColorScheme();
  const toggleScheme = () => setColorScheme(configScheme === 'dark' ? 'light' : 'dark');

  const {
    sosState,
    countdown,
    alertsSent,
    contacts,
    location,
    elapsedSeconds,
    repeatCount,
    triggerSOS,
    cancelSOS,
  } = useSOS();

  const handleShake = useCallback(() => {
    if (sosState === 'idle') triggerSOS();
  }, [sosState, triggerSOS]);

  useShakeDetection(handleShake, shakeEnabled);

  return (
    <div className={`${styles.page} ${sosState === 'active' ? styles.activeState : ''}`}>
      <StatusBar isOnline={isOnline} hasLocation={!!location} />

      <header className={styles.header}>
        <div className={styles.logo}>
          <Shield size={22} className={styles.logoIcon} />
          <span>SafeGuard SOS</span>
        </div>
        <button className={styles.themeBtn} onClick={() => toggleScheme()} aria-label="Toggle theme">
          {resolvedScheme === 'dark' ? '☀️' : '🌙'}
          <span className={styles.srOnly}>{resolvedScheme === 'dark' ? 'Switch to light' : 'Switch to dark'}</span>
        </button>
      </header>

      {sosState === 'active' && (
        <div className={styles.emergencyBanner}>
          🚨 EMERGENCY ALERT ACTIVE — Help is on the way
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.buttonSection}>
          {sosState === 'idle' && (
            <p className={styles.hint}>Hold button for immediate emergency alert</p>
          )}
          {sosState === 'countdown' && (
            <p className={styles.hintWarning}>Sending alert in {countdown} seconds…</p>
          )}

          <SOSButton
            state={sosState}
            countdown={countdown}
            elapsedSeconds={elapsedSeconds}
            onTrigger={triggerSOS}
            onCancel={cancelSOS}
          />

          {sosState === 'idle' && (
            <p className={styles.subHint}>
              Sends SMS to {contacts.length} emergency contact{contacts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className={styles.features}>
          <ShakeBanner enabled={shakeEnabled} onToggle={() => setShakeEnabled((v) => !v)} />

          {(sosState === 'active' || sosState === 'countdown') && (
            <AlertPanel
              contacts={contacts}
              alertsSent={alertsSent}
              elapsedSeconds={elapsedSeconds}
              repeatCount={repeatCount}
            />
          )}

          <MapView location={location} isActive={sosState === 'active'} />

          {sosState === 'idle' && (
            <div className={styles.quickActions}>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>📱</span>
                <div>
                  <p className={styles.featureName}>Offline Fallback</p>
                  <p className={styles.featureDesc}>SMS via Bluetooth mesh when offline</p>
                </div>
              </div>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>📏</span>
                <div>
                  <p className={styles.featureName}>Evidence Recorder</p>
                  <p className={styles.featureDesc}>Auto audio/video capture on SOS</p>
                </div>
              </div>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>🔊</span>
                <div>
                  <p className={styles.featureName}>Voice Activation</p>
                  <p className={styles.featureDesc}>Say &quot;Help me&quot; to trigger SOS</p>
                </div>
              </div>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>⚡</span>
                <div>
                  <p className={styles.featureName}>Battery Saver</p>
                  <p className={styles.featureDesc}>Runs on as low as 1% battery</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
