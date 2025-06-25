import { HashRepository } from '../../repository/hashRepository';
import { TokenRepository } from '../../repository/tokenRepository';
import { IUserRepository } from '../../repository/userRepository';

export interface AuthServiceDeps {
  userRepository: IUserRepository;
  hashRepository: HashRepository;
  tokenRepository: TokenRepository;
}

// this file just help define the structure of dependencies that the AuthenticationService will need.