import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Bloque, Inmueble
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
