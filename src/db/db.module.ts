import { Module } from '@nestjs/common';
import { databaseProviders } from './db.provider';

@Module({
    imports:[],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }