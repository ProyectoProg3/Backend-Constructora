import {AuthenticationStrategy} from '@loopback/authentication';
import {UserProfile} from '@loopback/security';

export class AdminStrategy implements AuthenticationStrategy{
  name: String = 'admin';

  constructor(){

  }
  async authenticate(request: Request): Promise<UserProfile | undefined>{
    return throw httpErrors[401]("No tiene autorización");
}
