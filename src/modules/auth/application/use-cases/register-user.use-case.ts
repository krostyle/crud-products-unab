import { UserRepositoryInterface } from '@/modules/auth/domain/repositories/userRepositoryInterface';
import { RegisterUserInputDto } from '@/modules/auth/application/dto/register-user-input.dto';
import { RegisterUserOutputDto } from '@/modules/auth/application/dto/register-user-output.dto';
import { UserEntity } from '@/modules/auth/domain/entities/user.entity';
import { v4 as uuid } from 'uuid';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepositoryInterface: UserRepositoryInterface,
  ) {}

  async execute(
    registerUserDto: RegisterUserInputDto,
  ): Promise<RegisterUserOutputDto> {
    const existingUser = await this.userRepositoryInterface.findByEmail(
      registerUserDto.email,
    );

    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    //De momento guardamos la contraseña sin encriptar

    const newUser = new UserEntity(
      uuid(),
      registerUserDto.name,
      registerUserDto.email,
      registerUserDto.password,
    );

    const savedUser = await this.userRepositoryInterface.save(newUser);

    return {
      email: savedUser.email,
      name: savedUser.name,
    };
  }
}
