import { Environment } from '@Common/types/env.enums';

export interface Config {
  APP_PORT: number;
  EXTERNAL_COUNTRIES_SERVICES_URL: string;
  NODE_ENV: Environment;
}
