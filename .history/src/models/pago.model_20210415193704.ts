import {belongsTo, Entity, model, property} from '@loopback/repository';
import {SolicitudClienteInmueble} from './solicitud-cliente-inmueble.model';

@model(/*{
  settings: {
    foreignKeys: {
      fk_solicitud_id: {
        name: 'fk_solicitud_id',
        entity: 'SolicitudClienteInmueble',
        entityKey: 'id',
        foreignKey: 'solicitudClienteInmuebleId',
      },
    },
  },
})
export class Pago extends Entity {
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
  comprobante: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => SolicitudClienteInmueble)
  solicitudClienteInmuebleId: number;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
