import {AuthenticationStrategy} from '@loopback/authentication';
imoport {userProfile}

export class AdminStrategy implements AuthenticationStrategy{
  name: String = 'admin';

  constructor(){

  }
  async authenticate(request: Request): Promise<UserProfileFactory | undefined>(){

}

