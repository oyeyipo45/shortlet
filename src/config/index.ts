import { Environment } from '@Common/types/env.enum';

export const configuration = (): {
  nodeENV: Environment;
  appPort: number;
  externalCountriesServicesURL: string;
} => ({
  nodeENV: <Environment>process.env.NODE_ENV,
  appPort: Number(process.env.APP_PORT),
  externalCountriesServicesURL: <string>(
    process.env.EXTERNAL_COUNTRIES_SERVICES_URL
  ),
});
