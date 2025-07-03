import { HashRepository } from '../../repository/hashRepository';
import { TokenRepository } from '../../repository/tokenRepository';
import { IAuthRepository } from '../../repository/authRepository';

export interface AuthServiceDeps {
  userRepository: IAuthRepository;
  hashRepository: HashRepository;
  tokenRepository: TokenRepository;
}

// this file just help define the structure of dependencies that the AuthenticationService will need.