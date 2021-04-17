import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {SesionService} from '../services';

export class AdminStrategy implements AuthenticationStrategy {
  name: String = 'admin';

  constructor(@service(SesionService) public servicioSesion: SesionService) {

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]("No tiene autorización");
    }
    let datos = this.servicioSesion.verificarTokenJWT(token);
    if(datos){
      let perfil: UserProfile = Object.assign({
        datos.data.username;
      })
    }else{
      throw new HttpErrors[401]("No tiene autorización");

    }


  }
}
