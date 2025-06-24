import { HashRepository } from '../../repository/hashRepository';
import { IUserRepository } from '../../repository/userRepository';

export interface SignupDeps {
  userRepository: IUserRepository;
  hashRepository: HashRepository;
}
