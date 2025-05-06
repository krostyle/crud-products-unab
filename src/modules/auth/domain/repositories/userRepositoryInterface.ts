import { UserEntity } from '@/modules/auth/domain/entities/user.entity';

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<UserEntity | null>;
  
  save(user: UserEntity): Promise<UserEntity>;
}
