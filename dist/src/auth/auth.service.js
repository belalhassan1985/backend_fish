"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async validateUser(usernameOrEmail, pass) {
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
    async login(user) {
        let validUser = user;
        if (user.username && user.password) {
            validUser = await this.validateUser(user.username, user.password);
            if (!validUser) {
                throw new common_1.UnauthorizedException('Invalid credentials');
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map