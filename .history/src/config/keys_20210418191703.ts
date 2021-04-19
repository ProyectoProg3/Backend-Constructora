import {CargarArchivoController} from '../controllers';

export namespace Keys{
  export const origenCorreoElectronico = 'ucaldas.edu.co';
  export const asuntoNuevoUsuario = '[Nuevo Usuario Constructora] Mensaje de Bienvenida';
  export const tiempoVencimientoJWT = Math.floor(Date.now() / 1000) + (60 * 60 * 8);
  export const contrasenaSecretaJWT = 'jwt@Prog3*';
  export const twilioPhone = '+19095728055';
  export const carpetaImagenesProyectos = 'archivos/proyectos';
  export const nombreCampoImagenProyecto = 'file';
  export const extensionesPermitidasIMG:string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
}
