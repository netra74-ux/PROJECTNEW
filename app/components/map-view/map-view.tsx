import { MapPin, Navigation, Shield } from 'lucide-react';
import type { LocationData } from '~/hooks/use-sos';
import type { SafeZone } from '~/data/mock-data';
import { SAFE_ZONES } from '~/data/mock-data';
import styles from './map-view.module.css';

interface MapViewProps {
  location: LocationData | null;
  isActive: boolean;
}

function getSafetyColor(score: number) {
  if (score >= 80) return '#00c851';
  if (score >= 60) return '#ff9500';
  return '#ff1a1a';
}

function getSafetyLabel(score: number) {
  if (score >= 80) return 'Safe';
  if (score >= 60) return 'Moderate';
  return 'Unsafe';
}

export function MapView({ location, isActive }: MapViewProps) {
  const lat = location?.latitude ?? 40.7589;
  const lng = location?.longitude ?? -73.9851;
  const zoom = 14;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x250&maptype=roadmap&markers=color:red%7C${lat},${lng}&style=feature:all|element:labels|visibility:on&key=DEMO`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Navigation size={16} />
          <span>Live Location</span>
        </div>
        {isActive && <span className={styles.activePing}>TRACKING</span>}
      </div>

      {/* OpenStreetMap Embed (free, no API key) */}
      <div className={styles.mapWrapper}>
        <iframe
          className={styles.mapFrame}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.007},${lng + 0.01},${lat + 0.007}&layer=mapnik&marker=${lat},${lng}`}
          title="Live location map"
          loading="lazy"
        />
        {isActive && <div className={styles.activePulse} />}
      </div>

      <div className={styles.coordRow}>
        <MapPin size={14} className={styles.coordIcon} />
        <span className={styles.coords}>
          {lat.toFixed(5)}, {lng.toFixed(5)}
        </span>
        <span className={styles.accuracy}>±{location?.accuracy?.toFixed(0) ?? '15'}m</span>
      </div>

      <div className={styles.safeZones}>
        <p className={styles.safeZonesTitle}>
          <Shield size={14} /> Nearby Safety Scores
        </p>
        <div className={styles.zoneList}>
          {SAFE_ZONES.map((zone) => (
            <div key={zone.id} className={styles.zone}>
              <span className={styles.zoneName}>{zone.name}</span>
              <div className={styles.zoneScore}>
                <div
                  className={styles.scoreBar}
                  style={{
                    width: `${zone.safetyScore}%`,
                    background: getSafetyColor(zone.safetyScore),
                  }}
                />
              </div>
              <span
                className={styles.scoreLabel}
                style={{ color: getSafetyColor(zone.safetyScore) }}
              >
                {getSafetyLabel(zone.safetyScore)} ({zone.safetyScore})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
