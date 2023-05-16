import { Roles } from ".";

export interface UserInfo{
    name: string;
    email: string;
    token: string;
    success: boolean;
    rol?: Roles;
}