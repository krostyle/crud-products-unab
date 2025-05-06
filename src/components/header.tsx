'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);

    // Añadir event listener para escuchar cambios en localStorage
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('user'));
    };

    window.addEventListener('storage', handleStorageChange);

    // También podemos usar un evento personalizado para actualizaciones internas
    window.addEventListener('authChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);

    // Disparar evento personalizado para informar sobre el cambio
    window.dispatchEvent(new Event('authChange'));

    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          CRUD Productos
        </Link>

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <Link href="/products">
              <Button variant="link">Productos</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
