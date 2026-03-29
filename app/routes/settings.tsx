import { useState } from 'react';
import { Settings, Bell, Vibrate, Mic, Radio, Shield, ChevronRight, Sun, Moon, Monitor } from 'lucide-react';
import { useColorScheme } from '@dazl/color-scheme/react';
import { MOCK_USER } from '~/data/mock-data';
import styles from './settings.module.css';

export function meta() {
  return [{ title: 'Settings | SafeGuard SOS' }];
}

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
    >
      <span className={styles.toggleThumb} />
    </button>
  );
}

export default function SettingsPage() {
  const { configScheme, setColorScheme } = useColorScheme();
  const scheme = configScheme;
  const setScheme = setColorScheme;
  const [countdownSec, setCountdownSec] = useState(3);
  const [repeatInterval, setRepeatInterval] = useState(30);
  const [notifications, setNotifications] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [voiceActivation, setVoiceActivation] = useState(false);
  const [bluetoothMesh, setBluetoothMesh] = useState(true);
  const [evidenceRecorder, setEvidenceRecorder] = useState(true);
  const [dangerZoneAlert, setDangerZoneAlert] = useState(true);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Settings size={20} className={styles.titleIcon} />
          Settings
        </h1>
      </header>

      <div className={styles.content}>
        {/* User Profile */}
        <div className={styles.profileCard}>
          <div className={styles.avatar}>{MOCK_USER.avatar}</div>
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>{MOCK_USER.name}</span>
            <span className={styles.profilePhone}>{MOCK_USER.phone}</span>
            <span className={styles.profileEmail}>{MOCK_USER.email}</span>
          </div>
          <ChevronRight size={18} className={styles.chevron} />
        </div>

        {/* Appearance */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Appearance</h2>
          <div className={styles.card}>
            <div className={styles.themeRow}>
              <button
                className={`${styles.themeOption} ${scheme === 'light' ? styles.themeActive : ''}`}
                onClick={() => setScheme('light')}
              >
                <Sun size={18} />
                Light
              </button>
              <button
                className={`${styles.themeOption} ${scheme === 'dark' ? styles.themeActive : ''}`}
                onClick={() => setScheme('dark')}
              >
                <Moon size={18} />
                Dark
              </button>
              <button
                className={`${styles.themeOption} ${scheme === 'system' ? styles.themeActive : ''}`}
                onClick={() => setScheme('system')}
              >
                <Monitor size={18} />
                System
              </button>
            </div>
          </div>
        </section>

        {/* SOS Configuration */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>SOS Configuration</h2>
          <div className={styles.card}>
            <div className={styles.settingRow}>
              <div>
                <p className={styles.settingLabel}>Countdown before trigger</p>
                <p className={styles.settingDesc}>Seconds before SOS is activated</p>
              </div>
              <select
                className={styles.select}
                value={countdownSec}
                onChange={(e) => setCountdownSec(Number(e.target.value))}
              >
                {[1, 2, 3, 5, 10].map((n) => (
                  <option key={n} value={n}>{n}s</option>
                ))}
              </select>
            </div>
            <div className={styles.divider} />
            <div className={styles.settingRow}>
              <div>
                <p className={styles.settingLabel}>Alert repeat interval</p>
                <p className={styles.settingDesc}>Resend SMS every N seconds</p>
              </div>
              <select
                className={styles.select}
                value={repeatInterval}
                onChange={(e) => setRepeatInterval(Number(e.target.value))}
              >
                {[15, 30, 60, 120].map((n) => (
                  <option key={n} value={n}>{n}s</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Alerts & Notifications</h2>
          <div className={styles.card}>
            {[
              { icon: Bell, label: 'Push notifications', desc: 'Notify you of incoming alerts', value: notifications, toggle: () => setNotifications((v) => !v) },
              { icon: Vibrate, label: 'Vibration', desc: 'Vibrate on SOS trigger', value: vibration, toggle: () => setVibration((v) => !v) },
              { icon: Shield, label: 'Danger zone alerts', desc: 'Warn contacts when in unsafe areas', value: dangerZoneAlert, toggle: () => setDangerZoneAlert((v) => !v) },
            ].map((item, i) => (
              <>
                {i > 0 && <div key={`d-${i}`} className={styles.divider} />}
                <div key={item.label} className={styles.settingRow}>
                  <item.icon size={18} className={styles.settingIcon} />
                  <div className={styles.settingText}>
                    <p className={styles.settingLabel}>{item.label}</p>
                    <p className={styles.settingDesc}>{item.desc}</p>
                  </div>
                  <Toggle checked={item.value} onChange={item.toggle} />
                </div>
              </>
            ))}
          </div>
        </section>

        {/* Advanced */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Advanced Features</h2>
          <div className={styles.card}>
            {[
              { icon: Mic, label: 'Voice activation', desc: 'Say "Help me" to trigger SOS', value: voiceActivation, toggle: () => setVoiceActivation((v) => !v) },
              { icon: Radio, label: 'Bluetooth mesh SMS', desc: 'Offline routing via nearby phones', value: bluetoothMesh, toggle: () => setBluetoothMesh((v) => !v) },
              { icon: Shield, label: 'Auto evidence recorder', desc: 'Record audio/video when SOS triggers', value: evidenceRecorder, toggle: () => setEvidenceRecorder((v) => !v) },
            ].map((item, i) => (
              <>
                {i > 0 && <div key={`d-${i}`} className={styles.divider} />}
                <div key={item.label} className={styles.settingRow}>
                  <item.icon size={18} className={styles.settingIcon} />
                  <div className={styles.settingText}>
                    <p className={styles.settingLabel}>{item.label}</p>
                    <p className={styles.settingDesc}>{item.desc}</p>
                  </div>
                  <Toggle checked={item.value} onChange={item.toggle} />
                </div>
              </>
            ))}
          </div>
        </section>

        {/* Twilio API */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>API Integrations</h2>
          <div className={styles.card}>
            <div className={styles.apiRow}>
              <span className={styles.apiIcon}>📱</span>
              <div className={styles.settingText}>
                <p className={styles.settingLabel}>Twilio SMS API</p>
                <p className={styles.settingDesc}>Account SID &amp; Auth Token for SMS delivery</p>
              </div>
              <span className={styles.configureBtn}>Configure</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.apiRow}>
              <span className={styles.apiIcon}>🗺️</span>
              <div className={styles.settingText}>
                <p className={styles.settingLabel}>Google Maps API</p>
                <p className={styles.settingDesc}>Real-time location tracking &amp; maps</p>
              </div>
              <span className={styles.configureBtn}>Configure</span>
            </div>
          </div>
        </section>

        <div className={styles.version}>
          SafeGuard SOS v1.0.0 &bull; Emergency Safety System
        </div>
      </div>
    </div>
  );
}
