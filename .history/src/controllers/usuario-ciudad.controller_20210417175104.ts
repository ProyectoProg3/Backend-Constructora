import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Ciudad,
} from '../models';
import {UsuarioRepository} from '../repositories';

@authenticate('admin', 'vendedor')
export class UsuarioCiudadController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof Usuario.prototype.id,
  ): Promise<Ciudad> {
    return this.usuarioRepository.ciudad(id);
  }
}
