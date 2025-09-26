// Styles
import "../../assets/styles/buttons/buttons.scss";

// Hooks
import { useEffect, useState } from "react";

// Components
import Navbar from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import Pagination from "../../components/Navigation/Pagination";
import ClientCard from '../../components/Clients/ClientCard';

// Interfaces
import type { UsersResponse } from "../../types/user";
export type ActionType = "create" | "edit" | "remove";
import type { User } from "../../types/user";

// Services
import { getUsers } from "../../services/userService";


const Clients = () => {
  const [clients, setClients] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [isAction, setIsAction] = useState<ActionType>("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [nameSelectedClient, setNameSelectedClient] = useState<User | null>(null);
  // const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(16);

  useEffect(() => {
    setOpen(false);
  }, []);


  // Carregar selecionados do localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem("selectedClients");
    if (stored) {
      setSelectedClients(JSON.parse(stored));
    }
  }, []);

  const toggleSelectClient = (id: number) => {
    let updated: number[];
    if (selectedClients.includes(id)) {
      console.log('');
      updated = selectedClients.filter(cid => cid !== id);
    } else {
      updated = [...selectedClients, id];
      console.log('selecionado');
    }

    setSelectedClients(updated);
    localStorage.setItem("selectedClients", JSON.stringify(updated));
  };


  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setClients(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);


  const handleActions = (categ: ActionType, id: number) => {
    setIsAction(categ);
    setSelectedId(id);
    
    
    // acha o cliente correspondente
    const client = clients?.clients.find((c) => c.id === id) || null;
    setNameSelectedClient(client);

    setOpen(true);
  }

  // Função para resetar
  const handleClose = () => {
    setOpen(false);
    setIsAction("create"); 
    setSelectedId(null);
  };


  if (loading) return <p>Carregando clientes...</p>;

  return (
    <>
    <Navbar />
    <section className="page-clients">
      <div className="container mx-auto mt-9 px-2 lg:px-0">
        <div className="top-grid-clients flex justify-between mb-2">
          <span className="font-normal text-sm md:text-lg lg:text-lg"><strong className="font-bold">{clients?.clients.length ?? 0}</strong> clientes encontrados:</span>
          <span className="font-normal text-sm md:text-lg lg:text-lg">Clientes por página: {clientsPerPage}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clients?.clients.map((u) => (
            <ClientCard
              key={u.id}
              client={u}
              isSelected={selectedClients.includes(u.id)}
              onClick={() => toggleSelectClient(u.id)}
              onAction={(action, id) => handleActions(action, id)}
            />
          ))}
        </div>

        <button
          type="submit"
          className="button-create-clients mt-3 mb-3 flex w-full justify-center rounded-md cursor-pointer bg-transparent border-2 border-solid border-orange-500 px-3 py-3 text-sm/6 font-semibold text-orange-500 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          onClick={() => setOpen(true)}
        >
          Criar cliente
        </button>
          
        <Modal 
          open={open} 
          setOpen={setOpen} 
          action={isAction} 
          onClose={handleClose} 
          selectedId={selectedId} 
          nameSelectedClient={nameSelectedClient}
        />

        {/* Paginação */}
        {/* <Pagination /> */}

      </div>
    </section>
    </>
  )
}

export default Clients