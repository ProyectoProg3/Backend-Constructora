import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Cliente, SolicitudClienteInmueble
} from '../models';
import {SolicitudClienteInmuebleRepository} from '../repositories';


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
