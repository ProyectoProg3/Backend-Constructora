import {authenticate} from '@loopback/authentication';
import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudClienteInmueble,
  Cliente,
} from '../models';
import {SolicitudClienteInmuebleRepository} from '../repositories';

@authenticate('admin', 'vendedor')
export class SolicitudClienteInmuebleClienteController {
  constructor(
    @repository(SolicitudClienteInmuebleRepository)
    public solicitudClienteInmuebleRepository: SolicitudClienteInmuebleRepository,
  ) { }

  @get('/solicitud-cliente-inmuebles/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to SolicitudClienteInmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof SolicitudClienteInmueble.prototype.id,
  ): Promise<Cliente> {
    return this.solicitudClienteInmuebleRepository.cliente(id);
  }
}
