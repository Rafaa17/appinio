import { User as PrismaUser } from '@prisma/client';

export class UserDto implements PrismaUser {
  id: number;
  uuid: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
