import { api, requestConfig } from "../utils/config";

// Interface
// import type { User } from "../types/user";
import type { UsersResponse } from "../types/user";


// Get users
export const getUsers = async (): Promise<UsersResponse> => {
    const config = requestConfig("GET");

    const res = await fetch(`${api}/users`, config);
    if (!res.ok) {
    throw new Error("Erro ao buscar usuários");
    }

    const data: UsersResponse = await res.json();
    return data;
};



const userService = {
    getUsers,
};

export default userService;