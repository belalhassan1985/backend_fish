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

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findFirst({ // using findFirst because email is unique but findUnique requires strictly typed unique usage
            where: { email },
        }); // or define unique in schema and use findUnique
        // Actually schema says @unique, so findUnique is better but let's stick to findFirst simply or findUnique strictly

        // Better:
        // const user = await this.prisma.user.findUnique({ where: { email } });

        // However, I will use logic to be safe:
        const userFound = await this.prisma.user.findUnique({ where: { email } });

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
