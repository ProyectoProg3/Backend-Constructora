import {Entity, model, property, hasMany} from '@loopback/repository';
import {SolicitudClienteInmueble} from './solicitud-cliente-inmueble.model';

@model()
export class EstadoSolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => SolicitudClienteInmueble)
  solicitudesClienteInmueble: SolicitudClienteInmueble[];

  constructor(data?: Partial<EstadoSolicitud>) {
    super(data);
  }
}

export interface EstadoSolicitudRelations {
  // describe navigational properties here
}

export type EstadoSolicitudWithRelations = EstadoSolicitud & EstadoSolicitudRelations;
