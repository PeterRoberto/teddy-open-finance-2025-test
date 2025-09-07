export interface User {
  id?: number; // Vem do backend
  name: string;
  salary: number;
  companyValuation: number;
}

export interface UsersResponse {
  clients: User[];
}