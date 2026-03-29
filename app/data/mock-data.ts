export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  notified: boolean;
}

export interface SOSLog {
  id: string;
  timestamp: Date;
  latitude: number;
  longitude: number;
  address: string;
  status: 'active' | 'cancelled' | 'resolved';
  contactsNotified: number;
  duration: number; // seconds
}

export interface SafeZone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // meters
  safetyScore: number; // 0-100
}

export const MOCK_USER = {
  id: 'user-1',
  name: 'Alex Johnson',
  phone: '+1 (555) 012-3456',
  email: 'alex@example.com',
  avatar: 'AJ',
};

export const MOCK_CONTACTS: EmergencyContact[] = [
  { id: 'c1', name: 'Sarah Johnson', phone: '+1 (555) 987-6543', relation: 'Sister', notified: false },
  { id: 'c2', name: 'Mike Chen', phone: '+1 (555) 234-5678', relation: 'Friend', notified: false },
  { id: 'c3', name: 'Dr. Williams', phone: '+1 (555) 345-6789', relation: 'Doctor', notified: false },
];

export const MOCK_LOGS: SOSLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 86400000 * 2),
    latitude: 40.7589,
    longitude: -73.9851,
    address: 'Times Square, New York, NY',
    status: 'cancelled',
    contactsNotified: 3,
    duration: 45,
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 86400000 * 5),
    latitude: 40.7614,
    longitude: -73.9776,
    address: 'Midtown Manhattan, New York, NY',
    status: 'resolved',
    contactsNotified: 3,
    duration: 120,
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 86400000 * 12),
    latitude: 40.7505,
    longitude: -73.9934,
    address: 'Hell\'s Kitchen, New York, NY',
    status: 'resolved',
    contactsNotified: 2,
    duration: 30,
  },
];

export const SAFE_ZONES: SafeZone[] = [
  { id: 'sz1', name: 'City Center', latitude: 40.7589, longitude: -73.9851, radius: 500, safetyScore: 92 },
  { id: 'sz2', name: 'Downtown', latitude: 40.7614, longitude: -73.9776, radius: 300, safetyScore: 85 },
  { id: 'sz3', name: 'Riverside Park', latitude: 40.7829, longitude: -73.9654, radius: 800, safetyScore: 78 },
  { id: 'sz4', name: 'Your Neighborhood', latitude: 40.7505, longitude: -73.9934, radius: 400, safetyScore: 65 },
];
