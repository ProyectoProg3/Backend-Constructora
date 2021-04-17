import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {nextTick} from 'process';

export class AdminStrategy implements AuthenticationStrategy {
  name: String = 'admin';

  constructor() {

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(req)
    if (| token) {
      const error = new Error('missing token')
      error.statusCode = 401
      return next(err)
    }
    return throw HttpErrors[401]("No tiene autorización");
  }
