import { Controller, Post, Body, Request, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.stategy';
import { ILoginPaylaod } from './auth.types';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthStrategy)
    @Post('login')
    async login(@Body() body: ILoginPaylaod) {
        return this.authService.login(body);
    }

    @UseGuards(AuthStrategy)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Request() req: any) {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split(' ')[1];
        await this.authService.logout();
        return { message: 'Logged out successfully' };
    }
}
