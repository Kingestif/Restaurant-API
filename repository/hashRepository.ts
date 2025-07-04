import bcrypt from 'bcrypt';

export interface HashRepository {
  hash: (password: string, salt: number) => Promise<string>;
  compare: (password: string, hash: string) => Promise<boolean>;
}


export class BcryptHashRepository implements HashRepository {

  async hash(password: string, salt: number): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}