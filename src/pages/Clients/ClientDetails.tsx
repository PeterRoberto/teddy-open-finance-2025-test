import Navbar from "../../components/Header/Header";
import ClientCard from "../../components/Clients/ClientCard";
import type { User } from "../../types/user";


interface ClientCardProps {
  client: User;
  isSelected?: boolean;
  onClick?: () => void;
  onAction?: (action: "edit" | "remove", id: number) => void;
}


const ClientDetails = ({ client, isSelected, onClick, onAction }: ClientCardProps) => {
  return (
    <div>
      <Navbar />
      <section className="page-selected-clients">
        <div className="container mx-auto mt-9 px-2">
          {/* <div className="top-grid-clients flex justify-between mb-2">
            <span className="font-normal text-lg"><strong className="font-bold">{clients?.clients.length ?? 0}</strong> clientes encontrados:</span>
            <span className="font-normal text-lg">Clientes por página: {clientsPerPage}</span>
          </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ClientCard
              key={u.id}
              client={u}
              isSelected={selectedClients.includes(u.id)}
              onClick={() => toggleSelectClient(u.id)}
              onAction={(action, id) => handleActions(action, id)}
            />
          </div>
  

        </div>
      </section>
    </div>
  )
}

export default ClientDetails