import { Controller, Get, Inject} from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LanguagesService } from '@Languages/languages.service';
import { Language } from '@Languages/types';

@ApiTags('Languages')
@Controller({ version: '1' })
export class LanguagesController {
  constructor(
    private readonly languageService: LanguagesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: 'Get Languages' })
  @Get('/api/languages')
  async getLanguages(): Promise<APIResponse<Language[]>> {
    return this.languageService.getLanguages();
  }
}
