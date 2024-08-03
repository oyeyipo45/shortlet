import { CONSTANTS } from '@Common/constants';
import { Config } from '@Common/types/config.type';
import { Controller, Get, Version } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller({ path: 'health' })
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
    private configService: ConfigService<Config, true>,
  ) {}

  @Version('1')
  @ApiOperation({ summary: 'Check application health' })
  @Get('application')
  @HealthCheck()
  async healthCheck(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      async (): Promise<HealthIndicatorResult> => ({
        [CONSTANTS.APP_NAME]: { status: 'up' },
      }),
    ]);
  }

  @Version('1')
  @ApiOperation({ summary: 'Check countries external API health' })
  @Get('external-api-health')
  @HealthCheck()
  async ExternalApiHealth(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      async (): Promise<HealthIndicatorResult> =>
        this.httpHealthIndicator.pingCheck(
          'external-api-health',
          `${this.configService.get('EXTERNAL_COUNTRIES_SERVICES_URL')}/name/${CONSTANTS.HEALTH_CHECK_COUNTRY}`,
        ),
    ]);
  }
}
