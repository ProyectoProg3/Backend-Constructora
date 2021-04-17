import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Bloque,
  Proyecto,
} from '../models';
import {BloqueRepository} from '../repositories';

export class BloqueProyectoController {
  constructor(
    @repository(BloqueRepository)
    public bloqueRepository: BloqueRepository,
  ) { }

  @get('/bloques/{id}/proyecto', {
    responses: {
      '200': {
        description: 'Proyecto belonging to Bloque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proyecto)},
          },
        },
      },
    },
  })
  async getProyecto(
    @param.path.number('id') id: typeof Bloque.prototype.id,
  ): Promise<Proyecto> {
    return this.bloqueRepository.proyecto(id);
  }
}
