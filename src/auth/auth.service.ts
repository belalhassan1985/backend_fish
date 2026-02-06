import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    private readonly ADMIN_USER = {
        username: 'admin',
        password: 'password123', // In a real app, use env vars and hashed passwords
    };

    async login(credentials: any) {
        console.log('Login attempt:', credentials);
        console.log('Expected:', this.ADMIN_USER);
        if (
            credentials.username?.trim() === this.ADMIN_USER.username &&
            credentials.password?.trim() === this.ADMIN_USER.password
        ) {
            return {
                success: true,
                accessToken: 'fake-jwt-token-for-demo', // Simplified for this iteration
                user: { name: 'Admin User', role: 'ADMIN' },
            };
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}
