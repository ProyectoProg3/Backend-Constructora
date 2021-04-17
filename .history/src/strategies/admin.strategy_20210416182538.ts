import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';

export class AdminStrategy implements AuthenticationStrategy {
  name: String = 'admin';

  constructor(@service(SessionService) public servcioSesion: SessionService) {

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]("No tiene autorización");
    }


  }
}
