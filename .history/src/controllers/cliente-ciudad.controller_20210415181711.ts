import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Ciudad,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteCiudadController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof Cliente.prototype.id,
  ): Promise<Ciudad> {
    return this.clienteRepository.ciudad(id);
  }
}
