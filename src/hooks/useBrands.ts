import { useState, useEffect } from 'react';
import { Brand } from '@/types/brand';
import { fetchBrandsClient, syncBrandsClient } from '@/lib/supabase/clientQueries';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // 1. Get cached brands immediately
      const initialBrands = await fetchBrandsClient();
      setBrands(initialBrands);
      setLoading(false);

      // 2. Fetch live updates in the background
      await syncBrandsClient((updatedBrands) => {
        setBrands(updatedBrands);
      });
    }

    loadData();
  }, []);

  return { brands, loading };
}
