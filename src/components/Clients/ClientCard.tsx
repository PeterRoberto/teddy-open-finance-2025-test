import { PencilIcon, TrashIcon, MinusIcon   } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';

import type { User } from "../../types/user";

// Hooks
import { useLocation } from 'react-router-dom';

interface ClientCardProps {
  client: User;
  isSelected?: boolean;
  onClick?: () => void;
  onAction?: (action: "edit" | "remove", id: number) => void;
}


export default function ClientCard({ client, isSelected, onClick, onAction }: ClientCardProps) {
    const location = useLocation();
  
    return (
    <div
      className={`clients-card text-center mb-2 flex flex-col justify-center items-center p-6 border rounded-lg shadow-sm w-full cursor-pointer 
        ${isSelected ? "bg-orange-100 border-orange-500" : "bg-white border-gray-200 hover:bg-gray-100"}
      `}
        >
        <h5 className="break-all text-base mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
        {client.name}
        </h5>
        <p className="font-normal text-sm text-black">Salário: R${client.salary}</p>
        <p className="font-normal text-sm text-black mt-2">Empresa: R${client.companyValuation}</p>

        {/* <h5 className="break-all text-base mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
        {u.name}
        </h5>
        <p className="font-normal text-sm text-black">
        Salário: R${u.salary}
        </p>
        <p className="font-normal text-sm text-black mt-2">
        Empresa: R${u.companyValuation}
        </p> */}

        {location.pathname === '/clientes' && (
            <>
            {onAction && (
                <div className="box-create-edit-remove w-full flex justify-between gap-3 mt-5">
                    <button 
                        type='button' 
                        className='cursor-pointer' 
                        onClick={onClick}
                        >
                        {isSelected ? 
                            <MinusIcon className="h-6 w-6 text-black" />
                        : 
                            <PlusIcon className="h-6 w-6 text-black" />
                        }
                    </button> 
                    <button 
                        type='button' 
                        className='cursor-pointer' 
                        onClick={() => onAction('edit', client.id)}
                        >
                        <PencilIcon className="h-6 w-6 text-black" />
                    </button>

                    <button 
                        type='button' 
                        className='cursor-pointer'
                        onClick={() => onAction('remove', client.id)}
                        >
                        <TrashIcon className="h-6 w-6 text-red-500" />
                    </button>
                </div>
            )}
            </>
            
        )}


        {/* Botões de ação, mas só mostra se recebeu `onAction` */}
        {location.pathname === '/clientes-selecionados' && (
            <>
            {onAction && (
                <div className="flex gap-2 mt-4">
                    <button
                        className="px-3 py-1 rounded bg-blue-500 text-white text-sm"
                        onClick={(e) => {
                        e.stopPropagation();
                        onAction("edit", client.id);
                        }}
                    >
                        Editar
                    </button>
                    <button
                        className="px-3 py-1 rounded bg-red-500 text-white text-sm"
                        onClick={(e) => {
                        e.stopPropagation();
                        onAction("remove", client.id);
                        }}
                    >
                        Excluir
                    </button>
                </div>
            )}
            </>
        )}


        



      {/* Botões de ação, mas só mostra se recebeu `onAction` */}
      {/* {onAction && (
        <div className="flex gap-2 mt-4">
          <button
            className="px-3 py-1 rounded bg-blue-500 text-white text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onAction("edit", client.id);
            }}
          >
            Editar
          </button>
          <button
            className="px-3 py-1 rounded bg-red-500 text-white text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onAction("remove", client.id);
            }}
          >
            Excluir
          </button>
        </div>
      )} */}
    </div>
  );
}
