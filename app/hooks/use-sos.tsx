import { useState, useEffect, useRef, useCallback } from 'react';
import type { EmergencyContact, SOSLog } from '~/data/mock-data';
import { MOCK_CONTACTS, MOCK_LOGS } from '~/data/mock-data';

export type SOSState = 'idle' | 'countdown' | 'active' | 'cancelling';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      // Fallback mock location for demo
      setLocation({ latitude: 40.7589, longitude: -73.9851, accuracy: 10, timestamp: Date.now() });
      return;
    }
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        });
        setLocationError(null);
      },
      () => {
        // Use mock location as fallback
        setLocation({ latitude: 40.7589, longitude: -73.9851, accuracy: 15, timestamp: Date.now() });
        setLocationError('Using demo location');
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
  }, []);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    startTracking();
    return () => stopTracking();
  }, [startTracking, stopTracking]);

  return { location, locationError, startTracking, stopTracking };
}

export function useSOS() {
  const [sosState, setSOSState] = useState<SOSState>('idle');
  const [countdown, setCountdown] = useState(3);
  const [alertsSent, setAlertsSent] = useState(0);
  const [activeSOSId, setActiveSOSId] = useState<string | null>(null);
  const [contacts, setContacts] = useState<EmergencyContact[]>(MOCK_CONTACTS);
  const [logs, setLogs] = useState<SOSLog[]>(MOCK_LOGS);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0);

  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const alertIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { location } = useLocation();

  const clearTimers = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    if (alertIntervalRef.current) clearInterval(alertIntervalRef.current);
    if (elapsedRef.current) clearInterval(elapsedRef.current);
  }, []);

  const activateSOS = useCallback((loc: { latitude: number; longitude: number } | null) => {
    const id = `sos-${Date.now()}`;
    setActiveSOSId(id);
    setSOSState('active');
    setElapsedSeconds(0);
    setRepeatCount(0);
    setAlertsSent(contacts.length);
    setContacts((prev) => prev.map((c) => ({ ...c, notified: true })));

    elapsedRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    alertIntervalRef.current = setInterval(() => {
      setRepeatCount((r) => r + 1);
      setAlertsSent((a) => a + contacts.length);
    }, 30000);

    const newLog: SOSLog = {
      id,
      timestamp: new Date(),
      latitude: loc?.latitude ?? 40.7589,
      longitude: loc?.longitude ?? -73.9851,
      address: 'Current Location',
      status: 'active',
      contactsNotified: contacts.length,
      duration: 0,
    };
    setLogs((prev) => [newLog, ...prev]);
  }, [contacts]);

  const triggerSOS = useCallback(() => {
    if (sosState !== 'idle') return;
    setSOSState('countdown');
    setCountdown(3);

    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countdownRef.current!);
          activateSOS(location);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, [sosState, activateSOS, location]);

  const cancelSOS = useCallback(() => {
    clearTimers();
    setSOSState('cancelling');
    setContacts((prev) => prev.map((c) => ({ ...c, notified: false })));

    if (activeSOSId) {
      setLogs((prev) =>
        prev.map((log) =>
          log.id === activeSOSId
            ? { ...log, status: 'cancelled', duration: elapsedSeconds }
            : log
        )
      );
    }

    setTimeout(() => {
      setSOSState('idle');
      setAlertsSent(0);
      setElapsedSeconds(0);
      setActiveSOSId(null);
    }, 1500);
  }, [clearTimers, activeSOSId, elapsedSeconds]);

  const addContact = useCallback((contact: Omit<EmergencyContact, 'id' | 'notified'>) => {
    const newContact: EmergencyContact = {
      ...contact,
      id: `c-${Date.now()}`,
      notified: false,
    };
    setContacts((prev) => [...prev, newContact]);
  }, []);

  const removeContact = useCallback((id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return {
    sosState,
    countdown,
    alertsSent,
    contacts,
    logs,
    location,
    elapsedSeconds,
    repeatCount,
    triggerSOS,
    cancelSOS,
    addContact,
    removeContact,
  };
}
