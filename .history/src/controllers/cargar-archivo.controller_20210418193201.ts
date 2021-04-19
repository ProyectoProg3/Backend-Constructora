import {inject} from '@loopback/core';
import {
  HttpErrors,
  post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest'
import {resolve} from 'dns';
import multer from 'emulter';
import path from 'path';
import {RequestClient} from 'twilio';
import {keys as llaves} from '../config/keys';

export class CargarArchivoController {
  constructor() {}

  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarImagenProyecto', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description:'Función de carga de la imagen del proyecto.',
      },
    },
  })
  async cargarImagenDelProyecto(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const rutaImagenProyecto = path.join(__dirname, llaves.carpetaImagenesProyectos);
    let res = await this.StoreFileToPath(rutaImagenProyecto, llaves.nombreCampoImagenProyecto, request, response, llaves.extensionesPermitidasIMG);
    if(res){
      const nombre_archivo = response.req?.file.filename;
      if (nombre_archivo){
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *Guardar el archivo en una ruta específica
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any)
      })
    })
  }
}
