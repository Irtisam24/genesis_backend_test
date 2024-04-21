import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ILoginPaylaod } from './auth.types';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user && await bcrypt.compare(pass, user.pass)) {
            const { pass, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid User');
    }

    async login(user: ILoginPaylaod) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async logout() {
        return { message: "User logged out" }
    }

}
