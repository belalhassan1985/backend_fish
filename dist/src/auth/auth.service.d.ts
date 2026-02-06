export declare class AuthService {
    private readonly ADMIN_USER;
    login(credentials: any): Promise<{
        success: boolean;
        accessToken: string;
        user: {
            name: string;
            role: string;
        };
    }>;
}
