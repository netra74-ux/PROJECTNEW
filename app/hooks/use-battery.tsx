import { useState, useEffect } from 'react';

export interface BatteryInfo {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

export function useBattery() {
  const [battery, setBattery] = useState<BatteryInfo>({
    level: 0.85,
    charging: false,
    chargingTime: Infinity,
    dischargingTime: 7200,
  });

  useEffect(() => {
    if (!('getBattery' in navigator)) return;
    (navigator as unknown as { getBattery: () => Promise<BatteryManager> })
      .getBattery()
      .then((bat: BatteryManager) => {
        const update = () =>
          setBattery({
            level: bat.level,
            charging: bat.charging,
            chargingTime: bat.chargingTime,
            dischargingTime: bat.dischargingTime,
          });
        update();
        bat.addEventListener('levelchange', update);
        bat.addEventListener('chargingchange', update);
        return () => {
          bat.removeEventListener('levelchange', update);
          bat.removeEventListener('chargingchange', update);
        };
      })
      .catch(() => {});
  }, []);

  return battery;
}

interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}
