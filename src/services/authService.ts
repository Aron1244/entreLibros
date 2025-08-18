import type { User, LoginCredentials, LoginResponse } from '../types/auth';

class AuthService {
  private readonly USER_KEY = 'user';

  // Simular delay de red
  private async simulateNetworkDelay(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Login
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      await this.simulateNetworkDelay();

      // Validar credenciales (simulación del backend)
      if (credentials.email === 'admin@mail.com' && credentials.password === '123') {
        const user: User = {
          email: 'admin@mail.com',
          name: 'Administrador',
          isAuthenticated: true
        };

        // Guardar en localStorage
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));

        // Disparar evento para notificar cambios de autenticación
        this.notifyAuthStateChange();

        return {
          success: true,
          message: 'Inicio de sesión exitoso',
          user
        };
      } else {
        return {
          success: false,
          message: 'Correo electrónico o contraseña incorrectos'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error de conexión. Inténtalo de nuevo.'
      };
    }
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.notifyAuthStateChange();
  }

  // Obtener usuario actual
  getCurrentUser(): User | null {
    try {
      // Verificar si estamos en el navegador
      if (typeof window === 'undefined') {
        return null;
      }
      
      const userData = localStorage.getItem(this.USER_KEY);
      if (userData) {
        const user = JSON.parse(userData);
        return user.isAuthenticated ? user : null;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    // Verificar si estamos en el navegador
    if (typeof window === 'undefined') {
      return false;
    }
    
    const user = this.getCurrentUser();
    return user !== null && user.isAuthenticated;
  }

  // Verificar si el usuario es admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.email === 'admin@mail.com';
  }

  // Notificar cambios en el estado de autenticación
  private notifyAuthStateChange(): void {
    // Verificar si estamos en el navegador
    if (typeof window === 'undefined') {
      return;
    }
    
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('authStateChanged'));
    
    // También disparar evento de storage para compatibilidad
    window.dispatchEvent(new StorageEvent('storage', {
      key: this.USER_KEY,
      newValue: localStorage.getItem(this.USER_KEY)
    }));
  }
}

// Exportar una instancia única del servicio
export const authService = new AuthService(); 