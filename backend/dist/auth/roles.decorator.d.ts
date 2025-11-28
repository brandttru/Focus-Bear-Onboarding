export declare enum Role {
    ADMIN = "admin",
    USER = "user"
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
