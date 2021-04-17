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
  EstadoSolicitud,
} from '../models';
import {SolicitudClienteInmuebleRepository} from '../repositories';

@authenticate('admin', 'vendedor')
export class SolicitudClienteInmuebleEstadoSolicitudController {
  constructor(
    @repository(SolicitudClienteInmuebleRepository)
    public solicitudClienteInmuebleRepository: SolicitudClienteInmuebleRepository,
  ) { }

  @get('/solicitud-cliente-inmuebles/{id}/estado-solicitud', {
    responses: {
      '200': {
        description: 'EstadoSolicitud belonging to SolicitudClienteInmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoSolicitud)},
          },
        },
      },
    },
  })
  async getEstadoSolicitud(
    @param.path.number('id') id: typeof SolicitudClienteInmueble.prototype.id,
  ): Promise<EstadoSolicitud> {
    return this.solicitudClienteInmuebleRepository.estadoSolicitud(id);
  }
}
