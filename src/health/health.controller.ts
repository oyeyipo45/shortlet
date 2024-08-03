import { CONSTANTS } from '@Common/constants';
import { Config } from '@Common/types/config.type';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller({ path: 'health' })
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
    private configService: ConfigService<Config, true>,
  ) {}

  @Get("application")
  @HealthCheck()
  async healthCheck(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      async (): Promise<HealthIndicatorResult> => ({
        [CONSTANTS.APP_NAME]: { status: 'up' },
      }),
    ]);
  }

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
