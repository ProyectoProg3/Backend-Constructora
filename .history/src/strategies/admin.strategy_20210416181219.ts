import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';

export class AdminStrategy implements AuthenticationStrategy {
  name: String = 'admin';

  constructor() {

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(req)
    if(1)
    return throw HttpErrors[401]("No tiene autorización");
  }
