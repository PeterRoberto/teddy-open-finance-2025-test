import { PencilIcon, TrashIcon   } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';

// Styles
import "../../assets/styles/buttons/buttons.scss";

// Hooks
import { useEffect, useState } from "react";

// Components
import Navbar from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import Pagination from "../../components/Navigation/Pagination";

// Interfaces
import type { UsersResponse } from "../../types/user";
export type ActionType = "create" | "edit" | "remove";

// Services
import { getUsers } from "../../services/userService";





const Clients = () => {
  const [clients, setClients] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [isAction, setIsAction] = useState<ActionType>("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(16);

  useEffect(() => {
    setOpen(false);
  }, []);

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
    setOpen(true);
    console.log(`Ação de ${categ} do cliente com ID: ${id}`);

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
      <div className="container mx-auto mt-9 px-2">
        <div className="top-grid-clients flex justify-between mb-2">
          <span className="font-normal text-lg"><strong className="font-bold">{clients?.clients.length ?? 0}</strong> clientes encontrados:</span>
          <span className="font-normal text-lg">Clientes por página: {clientsPerPage}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clients?.clients.map((u) => (
            <div key={u.id} className="clients-card text-center mb-2 flex flex-col justify-center items-center  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
              <h5 className="break-all text-base mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                {u.name}
                </h5>
              <p className="font-normal text-sm text-black">
                Salário: R${u.salary}
              </p>
              <p className="font-normal text-sm text-black mt-2">
                Empresa: R${u.companyValuation}
              </p>

              <div className="box-create-edit-remove w-full flex justify-between gap-3 mt-5">
                <button type='button' className='cursor-pointer'>
                  <PlusIcon className="h-7 w-7 text-black" />
                </button> 
                <button 
                  type='button' 
                  className='cursor-pointer' 
                  onClick={() => handleActions('edit', u.id)}
                  >
                  <PencilIcon className="h-6 w-6 text-black" />
                </button>

                <button 
                  type='button' 
                  className='cursor-pointer'
                  onClick={() => handleActions('remove', u.id)}
                  >
                  <TrashIcon className="h-6 w-6 text-red-500" />
                </button>
              </div>
            </div>
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
        />

        <Pagination />

      </div>
    </section>



    
    </>
  )
}

export default Clients