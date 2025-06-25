import { HashRepository } from '../../repository/hashRepository';
import { TokenRepository } from '../../repository/tokenRepository';
import { IUserRepository } from '../../repository/userRepository';

export interface SignupDeps {
  userRepository: IUserRepository;
  hashRepository: HashRepository;
  tokenRepository: TokenRepository;
}
