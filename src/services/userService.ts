import { api, requestConfig } from "../utils/config";

// Interface
import type { User } from "../types/user";
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


// Create clients
export const createClient = async (newClient: Omit<User, "id">): Promise<User> => {
    const config = requestConfig("POST", newClient);

    const res = await fetch(`${api}/users`, config)

    if (!res.ok) {
        throw new Error("Erro ao adicionar cliente");
    }

    const data: User = await res.json();

    return data;
};


export async function getClientById(id: number): Promise<User> {
    const config = requestConfig("GET")
    const res = await fetch(`${api}/users/${id}`, config);

    if (!res.ok) {
        throw new Error("Erro ao buscar usuário pelo ID");
    }
    const data: User = await res.json();
    return data;
};



const userService = {
    getUsers,
    createClient,
    getClientById
};

export default userService;