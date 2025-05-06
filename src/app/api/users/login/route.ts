import { UserController } from '@/modules/auth/adapters/controllers/user.controller';
import { NextRequest } from 'next/server';

const userController = new UserController();

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();

    // Validar que los datos necesarios estén presentes
    if (!data.email || !data.password) {
      return Response.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 },
      );
    }

    // Llamar al controlador para iniciar sesión
    return userController.login({
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return Response.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 },
    );
  }
};
