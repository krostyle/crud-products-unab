import { UserRepositoryInterface } from '@/modules/auth/domain/repositories/userRepositoryInterface';
import { UserEntity } from '@/modules/auth/domain/entities/user.entity';
import { MongoUserGateway } from '@/modules/auth/adapters/gateways/mongo-user-gateway';

export class MongooseUserRepository implements UserRepositoryInterface {
  constructor(private readonly mongoUserGateway = new MongoUserGateway()) {}

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.mongoUserGateway.fetchByEmail(email);
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.mongoUserGateway.save(user);
  }
}
