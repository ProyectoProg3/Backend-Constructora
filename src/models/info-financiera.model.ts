import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model({
  settings: {
    foreignKeys: {
      fk_cliente_id: {
        name: 'fk_cliente_infoFinanciera_id',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
    },
  },
})
export class InfoFinanciera extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  totalIngresos: number;

  @property({
    type: 'string',
    required: true,
  })
  datosTrabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  TiempoTrabActual: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreRefFamiliar: string;

  @property({
    type: 'string',
    required: true,
  })
  telRefFamiliar: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreRefPersonal: string;

  @property({
    type: 'string',
    required: true,
  })
  telRefPersonal: string;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<InfoFinanciera>) {
    super(data);
  }
}

export interface InfoFinancieraRelations {
  // describe navigational properties here
}

export type InfoFinancieraWithRelations = InfoFinanciera & InfoFinancieraRelations;
