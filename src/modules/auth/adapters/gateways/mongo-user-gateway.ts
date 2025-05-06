import { dbConnect } from '@/config/client';
import { UserModel } from '@/modules/auth/infrastructure/database/mongodb/schemas/user-schema';
import { UserEntity } from '@/modules/auth/domain/entities/user.entity';

export class MongoUserGateway {
  private async connect() {
    await dbConnect();
  }

  async fetchByEmail(email: string): Promise<UserEntity | null> {
    await this.connect();
    const doc = await UserModel.findOne({ email });
    if (!doc) {
      return null;
    }
    return new UserEntity(
      doc._id.toString(),
      doc.name,
      doc.email,
      doc.password,
    );
  }

  async save(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserEntity> {
    await this.connect();
    try {
      const doc = new UserModel({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      await doc.save();
      return new UserEntity(
        doc._id.toString(),
        doc.name,
        doc.email,
        doc.password,
      );
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Error saving user in database');
    }
  }
}
