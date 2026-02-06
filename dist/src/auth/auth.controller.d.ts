import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        success: boolean;
        accessToken: string;
        user: {
            name: any;
            email: any;
            role: any;
        };
    }>;
}
