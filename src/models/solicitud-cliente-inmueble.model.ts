import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {EstadoSolicitud} from './estado-solicitud.model';
import {Inmueble} from './inmueble.model';
import {Pago} from './pago.model';

@model({
  settings: {
    foreignKeys: {
      fk_inmueble_id: {
        name: 'fk_inmueble_id',
        entity: 'Inmueble',
        entityKey: 'id',
        foreignKey: 'inmuebleId',
      },

      fk_cliente_id: {
        name: 'fk_cliente_id',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },

      fk_estado_id: {
        name: 'fk_estado_id',
        entity: 'EstadoSolicitud',
        entityKey: 'id',
        foreignKey: 'estadoSolicitudId',
      },
    },
  },
})
export class SolicitudClienteInmueble extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    jsonSchema: {
      format: 'date', //This can be changed to 'date-time', 'time' or 'date'
    },
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
