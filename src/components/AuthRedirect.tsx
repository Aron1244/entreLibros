import { useEffect, useState } from 'react';
import { authService } from '../services/authService';

interface AuthRedirectProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ 
  redirectTo = '/', 
  children 
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser && currentUser.isAuthenticated) {
        console.log('Usuario ya autenticado, redirigiendo a:', redirectTo);
        window.location.href = redirectTo;
      }
    };

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

  // En el servidor, renderizar el contenido sin verificación
  if (!isClient) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default AuthRedirect; 