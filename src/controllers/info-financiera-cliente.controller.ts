import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Cliente, InfoFinanciera
} from '../models';
import {InfoFinancieraRepository} from '../repositories';


export class InfoFinancieraClienteController {
  constructor(
    @repository(InfoFinancieraRepository)
    public infoFinancieraRepository: InfoFinancieraRepository,
  ) { }

  @get('/info-financieras/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to InfoFinanciera',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof InfoFinanciera.prototype.id,
  ): Promise<Cliente> {
    return this.infoFinancieraRepository.cliente(id);
  }
}
