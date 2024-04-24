import { Role } from "./enume/role";

export interface User {
    id:number;
    name: string;
    email: string;
    role:Role;
    taskCount?:number;
}
