import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Bloque} from './bloque.model';
import {SolicitudClienteInmueble} from './solicitud-cliente-inmueble.model';

@model({
  settings: {
    foreignKeys: {
      fk_bloque_id: {
        name: 'fk_bloque_id',
        entity: 'Bloque',
        entityKey: 'id',
        foreignKey: 'BloqueId',
      },
    },
  },
})
export class Inmueble extends Entity {
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
  identificador: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Bloque)
  bloqueId: number;

  @hasMany(() => SolicitudClienteInmueble)
  solicitudesClienteInmueble: SolicitudClienteInmueble[];

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
