import { UserRepositoryInterface } from '@/modules/auth/domain/repositories/userRepositoryInterface';
import { UserEntity } from '@/modules/auth/domain/entities/user.entity';
import { JsonUserGateway } from '@/modules/auth/adapters/gateways/json-user-gateway';

export class JsonUserRepository implements UserRepositoryInterface {
  constructor(private readonly jsonUserGateway = new JsonUserGateway()) {}

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.jsonUserGateway.fetchByEmail(email);
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.jsonUserGateway.save({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
