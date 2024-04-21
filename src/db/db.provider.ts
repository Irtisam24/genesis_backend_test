import { ConfigService } from '@nestjs/config';
import { DATA_SOURCE } from '../constants';
import { DataSource } from 'typeorm';


const getConfig = (configservice: ConfigService, env: string) => {
  return configservice.get<string>(env === "test" ? `TEST_${env}` : env)
}

export const databaseProviders = [

  {
    provide: DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      console.log('Configuring DataSource...', configService.get<string>("NODE_ENV"));
      const dataSource = new DataSource({
        type: 'postgres',
        host: getConfig(configService, "DATABASE_HOST"),
        port: 5432,
        username: getConfig(configService, "DATABASE_USERNAME"),
        password: getConfig(configService, "DATABASE_PASSWORD"),
        database: getConfig(configService, "DATABASE_NAME"),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });
      await dataSource.initialize();
      console.log('DataSource has been initialized.');
      return dataSource;
    },
    inject: [ConfigService]
  },
];