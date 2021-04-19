import {inject} from '@loopback/core';
import {
  HttpErrors,
  post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest'
import multer from 'emulter';
import path from 'path';
import {keys as llaves} from '../config/keys';

export class CargarArchivoController {
  constructor() {}

  /**
   *
   */
  @post('/CargarImagenProyecto'){
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
    @inject(RestBindings.Http.RESPONSE) response: Response
  )
}
