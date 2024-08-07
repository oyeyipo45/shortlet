import { HttpStatus } from '@nestjs/common';
import { APIResponse, PaginateDataInterface } from '@Common/types';
import { Country} from '@Countries/types';
import { StatisticsInterface } from '@Statistics/types';
import { RegionInterface } from '@Regions/types';
import { Languages } from '@Languages/types';
import { LanguageMap } from '@Languages/types';


export type APIResponseTypes =
  | PaginateDataInterface
  | Country
  | StatisticsInterface
  | RegionInterface[]
  | LanguageMap
  | Languages;

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
