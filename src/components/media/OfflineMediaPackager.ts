/**
 * Offline Media Packager Architecture
 * 
 * Handles preloading, caching, and offline retrieval of high-resolution video
 * and media assets. Operates in conjunction with the Service Worker to guarantee
 * presentations run flawlessly on MacBooks/iPads without internet.
 */

export class OfflineMediaPackager {
  private static CACHE_NAME = 'ghf-media-v1';

  /**
   * Preloads a specific list of media URLs into the browser's Cache Storage.
   * Useful when a sales rep clicks "Download Presentation for Offline".
   */
  static async preloadMediaPack(urls: string[], onProgress?: (percent: number) => void): Promise<boolean> {
    if (!('caches' in window)) {
      console.warn('Cache API not supported in this browser.');
      return false;
    }

    try {
      const cache = await caches.open(this.CACHE_NAME);
      
      let loadedCount = 0;
      const total = urls.length;

      // Download in parallel with concurrency limit, or just Promise.all for now
      await Promise.all(urls.map(async (url) => {
        try {
          const response = await fetch(url, { mode: 'cors' });
          if (response.ok) {
            await cache.put(url, response);
          }
        } catch (e) {
          console.error(`Failed to cache ${url}`, e);
        } finally {
          loadedCount++;
          if (onProgress) onProgress(Math.round((loadedCount / total) * 100));
        }
      }));

      return true;
    } catch (error) {
      console.error('Offline packager failed:', error);
      return false;
    }
  }

  /**
   * Clears old media to free up disk space on the iPad/MacBook
   */
  static async clearCache(): Promise<void> {
    if ('caches' in window) {
      await caches.delete(this.CACHE_NAME);
    }
  }

  /**
   * Checks if a presentation's media is fully available offline
   */
  static async checkOfflineStatus(urls: string[]): Promise<boolean> {
    if (!('caches' in window)) return false;
    
    const cache = await caches.open(this.CACHE_NAME);
    for (const url of urls) {
      const match = await cache.match(url);
      if (!match) return false; // Missing at least one asset
    }
    
    return true;
  }
}
