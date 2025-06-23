import { UserEntity } from '../../entity/user';
import { HashRepository } from '../../repository/hashRepository';
import { IUserRepository } from '../../repository/IUserRepository';

export interface SignupDeps {
  userRepository: IUserRepository;
  UserEntity: typeof UserEntity;
  hashRepository: HashRepository;
}
