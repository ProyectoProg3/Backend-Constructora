import {Model, model, property} from '@loopback/repository';

@model()
export class RestablecerContrasena extends Model {
  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<RestablecerContrasena>) {
    super(data);
  }
}

export interface RestablecerContrasenaRelations {
  // describe navigational properties here
}

export type RestablecerContrasenaWithRelations = RestablecerContrasena & RestablecerContrasenaRelations;
