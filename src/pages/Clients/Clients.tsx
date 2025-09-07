// Styles
import "../../assets/styles/buttons/buttons.scss";

// Hooks
import { useEffect, useState } from "react";

// Components
import Navbar from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";

// Interfaces
import type { UsersResponse } from "../../types/user";

// Services
import { getUsers } from "../../services/userService";

// Context
import { useAuth } from "../../context/userContext";
import Pagination from "../../components/Navigation/Pagination";





const Clients = () => {
  const { name } = useAuth();
  const [clients, setClients] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

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


  if (loading) return <p>Carregando clientes...</p>;

  return (
    <>
    <Navbar />
    <section className="page-clients">
      <div className="container mx-auto mt-9 px-2">
        <div className="top-grid-clients flex justify-between mb-2">
          <span className="font-normal text-lg"><strong className="font-bold">16</strong> clientes encontrados:</span>
          <span className="font-normal text-lg">Clientes por página: </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clients?.clients.map((u) => (
            <a key={u.id} href="#" className="clients-card text-center mb-2 flex flex-col justify-center items-center  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
              <h5 className="break-all text-base mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                {u.name}
                </h5>
              <p className="font-normal text-sm text-black">
                Salário: R${u.salary}
              </p>
              <p className="font-normal text-sm text-black mt-2">
                Empresa: R${u.companyValuation}
              </p>
            </a>
          ))}
        </div>


        <button
          type="submit"
          className="button-create-clients mt-3 mb-3 flex w-full justify-center rounded-md cursor-pointer bg-transparent border-2 border-solid border-orange-500 px-3 py-3 text-sm/6 font-semibold text-orange-500 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          onClick={() => setOpen(true)}
        >
          Criar cliente
        </button>
          
        <Modal open={open} setOpen={setOpen} />

        <Pagination />

      </div>
    </section>



    
    </>
  )
}

export default Clients