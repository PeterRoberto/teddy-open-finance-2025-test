import Navbar from "../../components/Header/Header";
import { useEffect, useState } from "react";

// Interface
import type { User } from "../../types/user";


interface AuthUser {
  name: string;
}


const Clients = () => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [clients, setClients] = useState<User[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser) as AuthUser);
    }
  }, []);
  

  return (
    <div>
      <Navbar />
      Clients
      <h2>Olá, {authUser?.name}</h2>
      <h2>Lista de clientes:</h2>
      
      
    </div>
  )
}

export default Clients