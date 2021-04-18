import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';

export class AdminStrategy implements AuthenticationStrategy {
  name: String = 'admin';

  constructor() {

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    
    return throw HttpErrors[401]("No tiene autorización");
  }