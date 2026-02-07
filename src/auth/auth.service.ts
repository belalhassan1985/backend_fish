import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateUser(usernameOrEmail: string, pass: string): Promise<any> {
        const userFound = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: usernameOrEmail },
                    { name: usernameOrEmail }
                ]
            }
        });

        if (userFound && (await bcrypt.compare(pass, userFound.password))) {
            const { password, ...result } = userFound;
            return result;
        }
        return null;
    }

    async login(user: any) {
        // Determine if we received a raw body or a validated user object
        // If called from controller plain body:
        let validUser = user;

        // Check credentials if passed raw
        if (user.username && user.password) {
            validUser = await this.validateUser(user.username, user.password);
            if (!validUser) {
                throw new UnauthorizedException('Invalid credentials');
            }
        }

        const payload = { username: validUser.email, sub: validUser.id, role: validUser.role };
        return {
            success: true,
            accessToken: this.jwtService.sign(payload),
            user: {
                name: validUser.name,
                email: validUser.email,
                role: validUser.role,
            },
        };
    }
}
