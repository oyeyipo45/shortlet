import { Controller, Get } from '@nestjs/common';
import { APIResponse } from '@Common/types/api-response.type';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LanguagesService } from '@Languages/languages.service';
import { APIResponseTypes } from '@Common/api-response';

@ApiTags('Languages')
@Controller({ version: '1' })
export class LanguagesController {
  constructor(private readonly languageService: LanguagesService) {}

  @ApiOperation({
    summary: `Retrieve a list of languages and the countries where
they are spoken. Include the total number of speakers globally for each
language.`,
  })
  @Get('/api/languages')
  async getLanguages(): Promise<APIResponse<APIResponseTypes>> {
    return this.languageService.getLanguages();
  }
}
