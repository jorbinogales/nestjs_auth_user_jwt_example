/* Extra */
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

interface IEnvironment {
  NODE_ENV: string;
  APP_NAME: string;
  APP_DESCRIPTION: string;
  API_VERSION: string;
  HOST: string;
  PORT: number;
  PATH_PREFIX: string;
  DB_CONNECTION: string;
  DB_HOST: string;
  DB_DATABASE: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
}

class EnvironmentVariables implements IEnvironment {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  APP_NAME: string;

  @IsString()
  APP_DESCRIPTION: string;

  @IsString()
  API_VERSION: string;

  @IsString()
  HOST: string;

  @IsString()
  PATH_PREFIX: string;

  @IsString()
  DB_CONNECTION: string;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_DATABASE: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;
}

export function EnvValidation(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());

  return validatedConfig;
}
