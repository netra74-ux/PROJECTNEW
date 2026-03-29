import { useEffect, useRef } from 'react';

const SHAKE_THRESHOLD = 15;
const SHAKE_TIMEOUT = 1000;

export function useShakeDetection(onShake: () => void, enabled: boolean) {
  const lastAccelRef = useRef({ x: 0, y: 0, z: 0 });
  const lastTimeRef = useRef(0);
  const shakeCountRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const now = Date.now();
      const dt = now - lastTimeRef.current;
      if (dt < 100) return;

      const dx = Math.abs((acc.x ?? 0) - lastAccelRef.current.x);
      const dy = Math.abs((acc.y ?? 0) - lastAccelRef.current.y);
      const dz = Math.abs((acc.z ?? 0) - lastAccelRef.current.z);
      const delta = dx + dy + dz;

      if (delta > SHAKE_THRESHOLD) {
        shakeCountRef.current += 1;
        if (shakeCountRef.current >= 3) {
          shakeCountRef.current = 0;
          onShake();
        }
      } else if (now - lastTimeRef.current > SHAKE_TIMEOUT) {
        shakeCountRef.current = 0;
      }

      lastAccelRef.current = { x: acc.x ?? 0, y: acc.y ?? 0, z: acc.z ?? 0 };
      lastTimeRef.current = now;
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [onShake, enabled]);
}
