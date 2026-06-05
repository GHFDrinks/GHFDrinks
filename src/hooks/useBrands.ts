import { useState, useEffect } from 'react';
import { Brand } from '@/types/brand';
import { fetchBrandsClient, syncBrandsClient } from '@/lib/supabase/clientQueries';
import { STATIC_BRANDS } from '@/lib/static-brands';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>(STATIC_BRANDS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      // 1. Get cached brands if available
      const initialBrands = await fetchBrandsClient();
      if (initialBrands && initialBrands.length > 0) {
        setBrands(initialBrands);
      }

      // 2. Fetch live updates in the background
      await syncBrandsClient((updatedBrands) => {
        if (updatedBrands && updatedBrands.length > 0) {
          setBrands(updatedBrands);
        }
      });
    }

    loadData();
  }, []);

  return { brands, loading };
}
