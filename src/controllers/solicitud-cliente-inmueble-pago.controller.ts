import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Pago, SolicitudClienteInmueble
} from '../models';
import {SolicitudClienteInmuebleRepository} from '../repositories';


export class SolicitudClienteInmueblePagoController {
  constructor(
    @repository(SolicitudClienteInmuebleRepository)
    public solicitudClienteInmuebleRepository: SolicitudClienteInmuebleRepository,
  ) { }

  @get('/solicitud-cliente-inmuebles/{id}/pago', {
    responses: {
      '200': {
        description: 'Pago belonging to SolicitudClienteInmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pago)},
          },
        },
      },
    },
  })
  async getPago(
    @param.path.number('id') id: typeof SolicitudClienteInmueble.prototype.id,
  ): Promise<Pago> {
    return this.solicitudClienteInmuebleRepository.pago(id);
  }
}
