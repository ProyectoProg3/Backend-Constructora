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
        
      }
    }
  }
}
