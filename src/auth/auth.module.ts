import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.stategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET', ''),
                signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION', '3600s') },
            }),
        }),
    ],
    providers: [AuthService, AuthStrategy],
    controllers: [AuthController],
})
export class AuthModule { }
