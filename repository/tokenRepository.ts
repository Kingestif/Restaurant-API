import jwt from 'jsonwebtoken';

export interface TokenRepository {
  generateToken: (payload: object) => string;
  // verifyToken: (token: string, secret: string) => Promise<jwt.JwtPayload>;
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

  // async verifyToken(token: string, secret: string): Promise<jwt.JwtPayload>  {
  //   const decoded = jwt.verify(token, secret);
  //   if(typeof decoded === 'string'){
  //     throw new Error("Invalid token");
  //   }

  //   return decoded;
  // }
}
