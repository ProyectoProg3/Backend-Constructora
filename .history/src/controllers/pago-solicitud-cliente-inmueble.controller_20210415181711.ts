import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pago,
  SolicitudClienteInmueble,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoSolicitudClienteInmuebleController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/solicitud-cliente-inmueble', {
    responses: {
      '200': {
        description: 'SolicitudClienteInmueble belonging to Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudClienteInmueble)},
          },
        },
      },
    },
  })
  async getSolicitudClienteInmueble(
    @param.path.number('id') id: typeof Pago.prototype.id,
  ): Promise<SolicitudClienteInmueble> {
    return this.pagoRepository.solicitudClienteInmueble(id);
  }
}
