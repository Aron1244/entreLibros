import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({ children, redirectTo = "/login" }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        window.location.href = redirectTo;
      }
    };

    // Verificar inmediatamente
    checkAuth();

    // Escuchar cambios en el estado de autenticación
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, [redirectTo]);

  // En el servidor, renderizar un placeholder que no cause hidratación
  if (!isClient) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  // En el cliente, verificar autenticación
  if (isAuthenticated === null) {
    const immediateAuth = authService.isAuthenticated();
    if (immediateAuth) {
      return <>{children}</>;
    }
    
    // Si no está autenticado, no mostrar nada mientras redirige
    return null;
  }

  if (isAuthenticated === true) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute; 