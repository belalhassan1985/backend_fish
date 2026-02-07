import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(usernameOrEmail: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        success: boolean;
        accessToken: string;
        user: {
            name: any;
            email: any;
            role: any;
        };
    }>;
}
