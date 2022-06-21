
import  bcrypt  from 'bcryptjs';



export class HashService {
  static readonly SALT_ROUNDS = 10;

  static async check(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async hashPassword(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, HashService.SALT_ROUNDS);
  }
}


