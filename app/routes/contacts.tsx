import { useSOS } from '~/hooks/use-sos';
import { ContactsManager } from '~/components/contacts-manager/contacts-manager';
import { Shield, Info } from 'lucide-react';
import styles from './contacts.module.css';

export function meta() {
  return [{ title: 'Emergency Contacts | SafeGuard SOS' }];
}

export default function ContactsPage() {
  const { contacts, addContact, removeContact } = useSOS();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Shield size={20} className={styles.titleIcon} />
          Emergency Contacts
        </h1>
        <p className={styles.subtitle}>
          These contacts will be instantly notified via SMS when you trigger an SOS alert.
        </p>
      </header>

      <div className={styles.content}>
        <ContactsManager
          contacts={contacts}
          onAdd={addContact}
          onRemove={removeContact}
        />

        <div className={styles.infoCard}>
          <Info size={16} className={styles.infoIcon} />
          <div>
            <p className={styles.infoTitle}>How it works</p>
            <p className={styles.infoText}>
              When SOS is activated, all contacts receive an SMS with your name, live location link,
              and a request to call emergency services. Alerts repeat every 30 seconds until cancelled.
            </p>
          </div>
        </div>

        <div className={styles.twilioNote}>
          <span className={styles.twilioIcon}>📱</span>
          <div>
            <p className={styles.twilioTitle}>SMS via Twilio API</p>
            <p className={styles.twilioText}>
              Configure your Twilio credentials in settings to enable real SMS delivery.
              Works in offline mode via Bluetooth mesh routing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
