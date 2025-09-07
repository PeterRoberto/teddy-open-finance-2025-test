import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Tipo do contexto
interface AuthContextType {
  name: string | null;
  setName: (name: string | null) => void;
}

// Cria o contexto tipado
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
    const [name, setName] = useState<string | null>(null);

    // Carregar nome do localStorage na primeira renderização
    useEffect(() => {
        const stored = localStorage.getItem("name");
        if (stored) {
            setName(stored);
        }
    }, []);

    
    // Salvar no localStorage sempre que mudar
    useEffect(() => {
        if (name) {
            localStorage.setItem("name", name);
        } else {
            localStorage.removeItem("name");
        }
    }, [name]);
    

    return (
        <AuthContext.Provider value={{ name, setName }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para usar em qualquer página
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
