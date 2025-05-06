'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const user = localStorage.getItem('user');
    if (!user) {
      // Si no hay usuario, redirigir al login
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  // Mientras verificamos la autenticación, mostramos un indicador de carga
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Cargando...</p>
      </div>
    );
  }

  // Si el usuario está autenticado, mostramos el contenido
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Si el usuario no está autenticado, solo renderizamos un div vacío
  // porque la redirección ya ocurrió en el useEffect
  return <div></div>;
}
