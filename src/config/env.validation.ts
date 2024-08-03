import { Config } from '@Common/types/config.type';
import { Environment } from '@Common/types/env.enum';
import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables implements Config {
  @IsNumber()
  @IsDefined()
  APP_PORT!: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  EXTERNAL_COUNTRIES_SERVICES_URL!: string;

  @IsNotEmpty()
  @IsEnum(Environment)
  NODE_ENV!: Environment;
}

export function configValidator(
  configuration: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfiguration = plainToClass(
    EnvironmentVariables,
    configuration,
    { enableImplicitConversion: true },
  );

  const errors = validateSync(validatedConfiguration, {
    skipMissingProperties: false,
  });

  // Throw error for environment variables failed validation
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfiguration;
}
