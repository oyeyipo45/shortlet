import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { QueryFilterParams } from '@Common/types/query-filter-params';
import { PaginateDataInterface } from '@Common/types/paginate-type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LanguageService } from '@Modules/languages/languages.service';
import { LanguageInterface } from '@Modules/languages/types';

@ApiTags('Languages')
@Controller({ version: '1' })
export class LanguageController {
  constructor(
    private readonly languageService: LanguageService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: 'Get Languages' })
  @Get('/api/languages')
  @ApiQuery({
    name: 'language',
    required: false,
    description: 'Name of language',
    type: 'string',
  })
  async getLanguages(): Promise<APIResponse<LanguageInterface[]>> {
    return this.languageService.getLanguages();
  }

  @ApiOperation({ summary: 'Get single language' })
  @Get('/api/languages/:language')
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'current page',
    type: 'number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of data per page',
    type: 'number',
  })
  @ApiParam({
    name: 'language',
    required: true,
    description: 'Language name',
    type: 'string',
  })
  async getLanguage(
    @Query() query: QueryFilterParams,
    @Param('language') language: string,
  ): Promise<APIResponse<PaginateDataInterface>> {
    return this.languageService.getLanguage(query, language);
  }
}
