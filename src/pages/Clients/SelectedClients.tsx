// Components
import Navbar from "../../components/Header/Header";
import ClientCard from "../../components/Clients/ClientCard";

// Types
import type { User } from "../../types/user";

// Hooks
import { useEffect, useState } from "react";

// Services
import { getUsers } from "../../services/userService";

const SelectedClients = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);


  // 1. Carregar selecionados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("selectedClients");
    if (stored) {
      setSelectedClients(JSON.parse(stored));
    }
  }, []);



  // 2. Buscar usuários completos
  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        // filtra apenas os clientes que estão em `selectedClients`
        const filtered = data.clients.filter((c: User) =>
          selectedClients.includes(c.id)
        );
        setClients(filtered);
      } catch (err) {
        console.error("Erro ao carregar clientes:", err);
      }
    }

    if (selectedClients.length > 0) {
      fetchUsers();
    }
  }, [selectedClients]);


  // Apagar todos os clientes selecionados de uma vez
  const handleCleanSelectedClients = () => {
    localStorage.removeItem("selectedClients"); 
    setSelectedClients([]); // limpa o estado também
    setClients([]); // limpa a lista renderizada
  };
  
  // Remover o cliente selecionado
  const handleUnselectClient = (id: number) => {
    const updated = selectedClients.filter(cid => cid !== id);
    setSelectedClients(updated);
    localStorage.setItem("selectedClients", JSON.stringify(updated));

    // também remove da lista de `clients` que renderiza os cards
    setClients(prev => prev.filter(c => c.id !== id));
  };


  return (
    <div>
      <Navbar />
      <section className="page-selected-clients">
        <div className="container mx-auto mt-9 px-2">
          <div className="top-grid-clients flex justify-between mb-2">
            <span className="font-normal text-sm md:text-lg">
              <strong className="font-bold">{clients.length} </strong> 
              clientes selecionados:
            </span>
          </div>

          {clients.length === 0 ? (
            <p className="text-gray-600">Nenhum cliente selecionado ainda.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {clients.map((u) => (
                <ClientCard
                  key={u.id}
                  client={u}
                  isSelected
                  onClick={() => handleUnselectClient(u.id)} 
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="button-create-clients mt-3 mb-3 flex w-full justify-center rounded-md cursor-pointer bg-transparent border-2 border-solid border-orange-500 px-3 py-3 text-sm/6 font-semibold text-orange-500 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            onClick={handleCleanSelectedClients}
          >
            Limpar clientes selecionados
          </button>
        </div>
      </section>
    </div>
  );
};

export default SelectedClients;
