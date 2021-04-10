import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<InfoFinanciera>) {
    super(data);
  }
}

export interface InfoFinancieraRelations {
  // describe navigational properties here
}

export type InfoFinancieraWithRelations = InfoFinanciera & InfoFinancieraRelations;
