import { Module } from '@nestjs/common';
import {BackendModule} from './backend/BackendModule';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
      BackendModule,
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'ProntoAiutoUser',
          password: 'ProntoAiutoUserPassword',
          database: 'ProntoAiutoDatabase',
          entities: [__dirname + '/**/*Entity{.ts,.js}'],
          synchronize: true,
      }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
