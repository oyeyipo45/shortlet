import { HttpStatus } from '@nestjs/common';
import { APIResponse, PaginateDataInterface } from '@Common/types';
import { Country } from '@Countries/types';
import { StatisticsInterface } from '@Statistics/types';
import { RegionInterface } from '@Regions/types';
import { LanguageInterface, Language } from '@/Modules/languages/types';
import { LanguageMap } from '@Languages/helpers';

export type APIResponseTypes =
  | PaginateDataInterface
  | Country
  | StatisticsInterface
  | RegionInterface[]
  | LanguageInterface
  | LanguageMap;

export const createApiResponse = (
  response: APIResponseTypes,
  context: string,
): APIResponse<APIResponseTypes> => {
  return {
    success: true,
    status: HttpStatus.OK,
    message: `${context} retrieved successfully`,
    data: response,
  };
};
