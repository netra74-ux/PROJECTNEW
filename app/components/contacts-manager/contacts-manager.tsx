import { useState } from 'react';
import { Plus, Trash2, Phone, User, Heart } from 'lucide-react';
import type { EmergencyContact } from '~/data/mock-data';
import styles from './contacts-manager.module.css';

interface ContactsManagerProps {
  contacts: EmergencyContact[];
  onAdd: (c: Omit<EmergencyContact, 'id' | 'notified'>) => void;
  onRemove: (id: string) => void;
}

const RELATIONS = ['Family', 'Friend', 'Partner', 'Doctor', 'Colleague', 'Other'];

export function ContactsManager({ contacts, onAdd, onRemove }: ContactsManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('Family');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onAdd({ name: name.trim(), phone: phone.trim(), relation });
    setName('');
    setPhone('');
    setRelation('Family');
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Heart size={16} />
          <span>Emergency Contacts</span>
        </div>
        <button className={styles.addBtn} onClick={() => setShowForm((v) => !v)}>
          <Plus size={16} />
          Add
        </button>
      </div>

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.inputWrap}>
              <User size={14} className={styles.inputIcon} />
              <input
                className={styles.input}
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputWrap}>
              <Phone size={14} className={styles.inputIcon} />
              <input
                className={styles.input}
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <select
              className={styles.select}
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            >
              {RELATIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button className={styles.submitBtn} type="submit">Save Contact</button>
          </div>
        </form>
      )}

      <div className={styles.list}>
        {contacts.length === 0 && (
          <div className={styles.empty}>
            No emergency contacts added yet
          </div>
        )}
        {contacts.map((contact) => (
          <div key={contact.id} className={styles.contactCard}>
            <div className={styles.avatar}>
              {contact.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div className={styles.info}>
              <span className={styles.name}>{contact.name}</span>
              <span className={styles.phone}>{contact.phone}</span>
            </div>
            <span className={styles.relation}>{contact.relation}</span>
            <button
              className={styles.removeBtn}
              onClick={() => onRemove(contact.id)}
              aria-label={`Remove ${contact.name}`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
