import { api, requestConfig } from "../utils/config";

// Interface
import type { User } from "../types/user";

console.log(`${api}/users`);

// Get users
export const getUsers = async (): Promise<User[]> => {
    const config = requestConfig("GET");
    const res = await fetch(`${api}/users`, config);

    if (!res.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    return res.json() as Promise<User[]>;
};



const userService = {
    getUsers,
};

export default userService;