import { UserEntity } from '../../entity/user';
import { IUserRepository } from '../../repository/IUserRepository';

export interface SignupDeps {
  userRepository: IUserRepository;
  bcrypt: typeof import('bcrypt');
  UserEntity: typeof UserEntity;
}

// This interface describes the dependencies required for the signup service.