import jwt from 'jsonwebtoken';

export interface TokenRepository {
  generateToken: (payload: object) => string;
  // verifyToken: (token: string, secret: string) => Promise<string>;
}

export class JwtTokenRepository implements TokenRepository {
  private secret: string;
  private expiresIn: number;

  constructor(secret: string, expiresIn: number){
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  // async verifyToken(token: string, secret: string): object | string {
  //   try {
  //     return jwt.verify(token, secret);
  //   } catch (error) {
  //     throw new Error('Invalid token');
  //   }
  // }
}
