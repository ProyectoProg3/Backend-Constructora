import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {SolicitudClienteInmueble} from './solicitud-cliente-inmueble.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudad_id: {
        name: 'fk_ciudad_cliente_id',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'ciudadId',
      },
    },
  },
})
export class Cliente extends Entity {
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
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'date',
    jsonSchema: {
      format: 'date', //This can be changed to 'date-time', 'time' or 'date'
    },
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  fotografia: string;

  @property({
    type: 'string',
    required: true,
  })
  numCelular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => SolicitudClienteInmueble)
  solicitudesClienteInmueble: SolicitudClienteInmueble[];


  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
