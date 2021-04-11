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
  InfoFinanciera,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteInfoFinancieraController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/info-financiera', {
    responses: {
      '200': {
        description: 'InfoFinanciera belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InfoFinanciera)},
          },
        },
      },
    },
  })
  async getInfoFinanciera(
    @param.path.number('id') id: typeof Cliente.prototype.id,
  ): Promise<InfoFinanciera> {
    return this.clienteRepository.infoFinanciera(id);
  }
}
