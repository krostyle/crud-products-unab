import { RegisterUserOutputDto } from '@/modules/auth/application/dto/register-user-output.dto';
import { LoginUserInputDto } from '@/modules/auth/application/dto/login-user-input.dto';
import { UserRepositoryInterface } from '@/modules/auth/domain/repositories/userRepositoryInterface';

export class LoginUserUseCase {
  constructor(
    private readonly userRepositoryInterface: UserRepositoryInterface,
  ) {}

  async execute(
    loginUserDto: LoginUserInputDto,
  ): Promise<{ user: RegisterUserOutputDto }> {
    const user = await this.userRepositoryInterface.findByEmail(
      loginUserDto.email,
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    //verificar contraseña de forma simple, sin bcrypt
    const isPasswordValid = user.password === loginUserDto.password;

    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    return {
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}
