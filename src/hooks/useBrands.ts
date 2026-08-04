import { useState, useEffect } from 'react';
import { Brand } from '@/types/brand';
import { syncBrandsClient } from '@/lib/supabase/clientQueries';
import { STATIC_BRANDS } from '@/lib/static-brands';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>(STATIC_BRANDS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function sync() {
      await syncBrandsClient((updatedBrands) => {
        if (active && updatedBrands && updatedBrands.length > 0) {
          setBrands(updatedBrands);
        }
      });
      // Signal a completed refresh (the reconnect indicator listens for this).
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('ghf:synced'));
      }
    }

    // Initial pull.
    sync();

    // Re-pull the latest team updates whenever the connection is (re)established.
    const onOnline = () => sync();
    window.addEventListener('online', onOnline);

    return () => {
      active = false;
      window.removeEventListener('online', onOnline);
    };
  }, []);

  return { brands, loading };
}
