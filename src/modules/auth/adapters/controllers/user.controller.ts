import { RegisterUserUseCase } from '@/modules/auth/application/use-cases/register-user.use-case';
import { NextResponse } from 'next/server';
import { LoginUserUseCase } from '@/modules/auth/application/use-cases/login-user.use-case';
import { JsonUserRepository } from '@/modules/auth/adapters/repositories/mongodb/json-user-repository';

export class UserController {
  private readonly userRepository = new JsonUserRepository();

  async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<NextResponse> {
    try {
      const registerUserUseCase = new RegisterUserUseCase(this.userRepository);
      const user = await registerUserUseCase.execute(data);
      return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
      console.error('Error en el registro de usuario:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<NextResponse> {
    try {
      const loginUserUseCase = new LoginUserUseCase(this.userRepository);
      const user = await loginUserUseCase.execute(data);
      return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
  }
}
