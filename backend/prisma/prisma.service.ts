import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;

// export class UserService {
//   private prisma = new PrismaClient();

//   async registerUser(data: { email: string; password: string }) {
//     return this.prisma.user.create({
//       data,
//     });
//   }
// }
