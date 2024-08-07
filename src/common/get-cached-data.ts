import { Cache } from '@nestjs/cache-manager';

export const getCachedData = async <T>(
  cacheManager: Cache,
  key: string,
): Promise<T> => {
  return await cacheManager.get<T>(key);
};
