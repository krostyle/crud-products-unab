'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const user = localStorage.getItem('user');
    if (user) {
      // Si hay usuario, redirigir a productos
      router.push('/products');
    } else {
      // Si no hay usuario, redirigir a login
      router.push('/login');
    }

    // Establecer un temporizador para evitar que la página quede
    // eternamente en "Cargando..." si hay un problema con la redirección
    const timer = setTimeout(() => {
      setIsRedirecting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  // Mostramos un mensaje de carga mientras se redirige
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-xl mb-4">Cargando...</p>
      {!isRedirecting && (
        <p className="text-sm text-gray-500">
          Si no eres redirigido automáticamente,
          <button
            onClick={() => router.push('/login')}
            className="text-blue-500 ml-1 hover:underline"
          >
            haz clic aquí
          </button>
        </p>
      )}
    </div>
  );
}
