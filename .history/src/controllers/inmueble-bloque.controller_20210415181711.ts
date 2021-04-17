import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Bloque,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleBloqueController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/bloque', {
    responses: {
      '200': {
        description: 'Bloque belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bloque)},
          },
        },
      },
    },
  })
  async getBloque(
    @param.path.number('id') id: typeof Inmueble.prototype.id,
  ): Promise<Bloque> {
    return this.inmuebleRepository.bloque(id);
  }
}
