import {AuthenticationStrategy, UserProfileFactory} from '@loopback/authentication';

export class AdminStrategy implements AuthenticationStrategy{
  name: String = 'admin';

  constructor(){

  }
  async authenticate(request: Request): Promise<UserProfileFactory | undefined>(){

}

