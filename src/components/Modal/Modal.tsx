// Icons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Hooks
import { useState, useEffect } from "react";

// Services
import { createClient, getClientById, updateClient, removeClientById } from '../../services/userService';

// Interface
import type { ActionType } from '../../pages/Clients/Clients';
import type { User } from '../../types/user';


import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";


interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  action: ActionType;
  selectedId?: number | null;
  onClose: () => void;
  nameSelectedClient?: User | null;
}



export default function Example({ open, setOpen, action, onClose, selectedId, nameSelectedClient }: ModalProps) {
  const [name, setName] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [companyValuation, setCompanyValuation] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // só valida os inputs se for create ou edit
    if (action === "create" || action === "edit") {
      if (!name || salary <= 0 || companyValuation <= 0) {
        setError("Preencha todos os campos corretamente.");
        return;
      }
    }

    try {
      if (action === "create") {
        await createClient({ name, salary, companyValuation });
        setMessage("Cliente criado com sucesso!");

        // Resetar estados, mensagens e fechar modal
        setTimeout(function() {
          setMessage(null);
          setName("");
          setSalary(0);
          setCompanyValuation(0);
        }, 2000);

      } else if (action === "edit" && selectedId) {
        await updateClient(selectedId, { name, salary, companyValuation });
        setMessage("Cliente atualizado com sucesso!");

        // Resetar estados, mensagens e fechar modal
        setTimeout(function() {
          setMessage(null);
        }, 2000);
      } else if (action === "remove" && selectedId) {
        await removeClientById(selectedId);
        setMessage("Cliente removido com sucesso!");

        // Resetar estados, mensagens e fechar modal
        setTimeout(function() {
          setMessage(null);
          onClose();
        }, 2000);
        
      }

    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro. Verifique os dados e tente novamente.");
    }
  };
  
  useEffect(() => {
    if (action === "create") {
      setName("");
      setSalary(0);
      setCompanyValuation(0);
    }

    if (action === "edit" && selectedId) {
      (async () => {
        try {
          const client = await getClientById(selectedId);
          setName(client.name);
          setSalary(client.salary);
          setCompanyValuation(client.companyValuation);
        } catch (err) {
          console.error("Erro ao buscar cliente:", err);
        }
      })();
    }
  }, [action, selectedId, open]);


  if (!open) return null;

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
              <div className="bg-white px-4 pt-5">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">

                  <div className="top-area flex justify-between items-center mb-3">
                    <DialogTitle
                      as="h3"
                      className="text-base font-bold text-black"
                    >
                      {action === "create" && (
                        <>
                        Criar Cliente:
                        </>
                      )}

                      {action === "edit" && (
                        <>
                        Editar Cliente:
                        </>
                      )}
                    </DialogTitle>

                    
                    <button
                      type="button"
                      onClick={onClose} 
                      className="cursor-pointer"
                      >
                        <XMarkIcon className="size-6 text-black" />
                    </button>
                  </div>
                  

                  <form onSubmit={handleSubmit}>
                    {action !== "remove" && (
                      <>
                        <div className="mt-2">
                          <input
                            id="first-name"
                            name="name"
                            type="text"
                            autoComplete="given-name"
                            placeholder="Digite o nome:"
                            className="h-[40px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mt-2">
                          <input
                            id="first-name"
                            name="salary"
                            type="number"
                            autoComplete="given-salary"
                            placeholder="Digite o salário:"
                            className="h-[40px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            value={salary || ""}
                            onChange={(e) => setSalary(Number(e.target.value))}
                            required
                          />
                        </div>

                        <div className="mt-2">
                          <input
                            id="valuation"
                            name="valuation"
                            type="number"
                            autoComplete="given-valuation"
                            placeholder="Digite o valor da empresa:"
                            className="h-[40px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            value={companyValuation || ""}
                            onChange={(e) => setCompanyValuation(Number(e.target.value))}
                            required
                          />
                        </div>
                      </>
                    )}

                    {action === "remove" && (
                      <>
                      <strong>Excluir cliente</strong>
                      <p className="mb-4">
                        Você está prestes a excluir o cliente:{" "}
                        <span className="font-bold">
                          {nameSelectedClient?.name || "Cliente"}
                        </span>
                      </p>
                      </>
                    )}

                    <div className="py-3">
                      <button
                        type="submit"
                        className="button-close-modal h-[40px] mb-3 flex w-full justify-center items-center rounded-md cursor-pointer  border-2 border-solid px-3 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                      >
                        {action === "create" && "Criar Cliente"}
                        {action === "edit" && "Editar Cliente"}
                        {action === "remove" && "Excluir cliente"}
                      </button>
                    </div>

                    {message && <p className="bg-green-600 py-2 px-5 m-auto mb-4 text-white rounded-sm max-w-max">{message}</p>}
                    {error && <p className="bg-red-600 py-2 px-5 m-auto mb-4 text-white rounded-md max-w-max">{error}</p>}
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
