import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { User } from '../users/users.entity';

describe('AuthService', () => {
    let service: AuthService;
    let mockJwtService: Partial<JwtService>;
    let mockUsersService;

    beforeEach(async () => {
        mockJwtService = {
            sign: jest.fn().mockImplementation((payload) => `mocked-jwt-token-for-${payload.userId}`),
        };
        mockUsersService = {
            validateUser: jest.fn().mockImplementation(async (email, password) => {
                return email === 'test@example.com' && password === 'password' ? new User() : null;
            })
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: mockJwtService
                },
                {
                    provide: UserService,
                    useValue: mockUsersService
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validateUser', () => {
        it('should return a user object if validation is successful', async () => {
            expect(await service.validateUser('test@example.com', 'password')).toBeInstanceOf(User);
        });

        it('should return null if validation fails', async () => {
            expect(await service.validateUser('test@example.com', 'wrongpassword')).toBeNull();
        });
    });

    describe('login', () => {
        it('should return a jwt token', async () => {
            const user = { email: "irtisam.d@gmail.com", userId: 1, username: 'testuser' };
            expect(await service.login(user)).toEqual({
                access_token: `mocked-jwt-token-for-${user.userId}`,
            });
        });
    });
});
