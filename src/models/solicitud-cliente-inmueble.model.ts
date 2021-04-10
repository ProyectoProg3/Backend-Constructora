import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<SolicitudClienteInmueble>) {
    super(data);
  }
}

export interface SolicitudClienteInmuebleRelations {
  // describe navigational properties here
}

export type SolicitudClienteInmuebleWithRelations = SolicitudClienteInmueble & SolicitudClienteInmuebleRelations;
