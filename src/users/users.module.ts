import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { userProviders } from './users.provider';
import { UserService } from './users.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...userProviders,
        UserService,
    ],
    exports:[UserService]
})
export class UsersModule { }
