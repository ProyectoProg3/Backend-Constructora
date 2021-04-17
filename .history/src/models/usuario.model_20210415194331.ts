import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Rol} from './rol.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudad_id: {
        name: 'fk_ciudad_usuario_id',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'ciudadId',
      },

      fk_rol_id: {
        name: 'fk_rol_id',
        entity: 'Rol',
        entityKey: 'id',
        foreignKey: 'rolId',
      },
    },
  },
})
export class Usuario extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_usuario: string;

  @property({
    type: 'string',})
  contrasena?: string;

  @belongsTo(() => Rol)
  rolId: number;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
