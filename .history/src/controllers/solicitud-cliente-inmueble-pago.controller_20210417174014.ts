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
  Pago,
} from '../models';
import {SolicitudClienteInmuebleRepository} from '../repositories';

@authenticate('admin')
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
