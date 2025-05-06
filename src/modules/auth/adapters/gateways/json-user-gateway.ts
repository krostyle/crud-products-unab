import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '@/modules/auth/domain/entities/user.entity';

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class JsonUserGateway {
  private filePath: string;

  constructor() {
    // Ruta al archivo JSON de usuarios
    this.filePath = path.join(process.cwd(), 'src/lib/storage/users.json');
  }

  private async readUsers(): Promise<UserData[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data || '[]');
    } catch (error) {
      // Si el archivo no existe o está vacío, devolver un array vacío
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        await this.writeUsers([]);
        return [];
      }
      console.error('Error reading users file:', error);
      return [];
    }
  }

  private async writeUsers(users: UserData[]): Promise<void> {
    try {
      // Asegurar que el directorio existe
      const dir = path.dirname(this.filePath);
      await fs.mkdir(dir, { recursive: true });

      // Escribir los datos en el archivo
      await fs.writeFile(this.filePath, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing users file:', error);
      throw new Error('Failed to write users data');
    }
  }

  async fetchByEmail(email: string): Promise<UserEntity | null> {
    const users = await this.readUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      return null;
    }

    return new UserEntity(user.id, user.name, user.email, user.password);
  }

  async save(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserEntity> {
    try {
      const users = await this.readUsers();

      // Verificar si el usuario ya existe
      const existingUser = users.find((u) => u.email === data.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Crear nuevo usuario
      const newUser: UserData = {
        id: uuidv4().toString(),
        name: data.name,
        email: data.email,
        password: data.password,
      };

      // Añadir a la lista y guardar
      users.push(newUser);
      await this.writeUsers(users);

      return new UserEntity(
        newUser.id,
        newUser.name,
        newUser.email,
        newUser.password,
      );
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Error saving user in JSON storage');
    }
  }
}
