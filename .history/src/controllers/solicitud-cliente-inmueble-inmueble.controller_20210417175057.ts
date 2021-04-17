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
  Inmueble,
} from '../models';
import {SolicitudClienteInmuebleRepository} from '../repositories';

@authenticate('admin', 'vendedor')
export class SolicitudClienteInmuebleInmuebleController {
  constructor(
    @repository(SolicitudClienteInmuebleRepository)
    public solicitudClienteInmuebleRepository: SolicitudClienteInmuebleRepository,
  ) { }

  @get('/solicitud-cliente-inmuebles/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Inmueble belonging to SolicitudClienteInmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async getInmueble(
    @param.path.number('id') id: typeof SolicitudClienteInmueble.prototype.id,
  ): Promise<Inmueble> {
    return this.solicitudClienteInmuebleRepository.inmueble(id);
  }
}
