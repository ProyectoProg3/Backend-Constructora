import {AuthenticationStrategy} from '@loopback/authentication';
import {userProfile} from '@loopback/security';

export class AdminStrategy implements AuthenticationStrategy{
  name: String = 'admin';

  constructor(){

  }
  async authenticate(request: Request): Promise<UserProfileFactory | undefined>(){

}

