import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SesionService {
  constructor(/* Add @inject to inject parameters */) { }

  /**
   * Funcion de generacion de un token JWT
   */
  GenerarToken(usuario: Usuario): string {
    let tk = jwt.sign({
      exp: llaves.tiempoVencimientoJWT,
      data: {
        username: usuario.nombre_usuario,
        role: usuario.rolId
      }
    }, llaves.contrasenaSecretaJWT);
    return tk;
  }

  /**
   * Verificar la validez de un token JWT
   */
  verificarTokenJWT(token: String) {
    var decoded = jwt.verify(token, 'shhhhh');
  }
}
