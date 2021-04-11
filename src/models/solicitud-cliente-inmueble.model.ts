import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Inmueble} from './inmueble.model';
import {Pago} from './pago.model';
import {EstadoSolicitud} from './estado-solicitud.model';

@model()
export class SolicitudClienteInmueble extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  oferta: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  @belongsTo(() => Inmueble)
  inmuebleId: number;

  @belongsTo(() => Pago)
  pagoId: number;

  @belongsTo(() => EstadoSolicitud)
  estadoSolicitudId: number;

  constructor(data?: Partial<SolicitudClienteInmueble>) {
    super(data);
  }
}

export interface SolicitudClienteInmuebleRelations {
  // describe navigational properties here
}

export type SolicitudClienteInmuebleWithRelations = SolicitudClienteInmueble & SolicitudClienteInmuebleRelations;
