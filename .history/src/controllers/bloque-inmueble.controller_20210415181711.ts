import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Bloque,
  Inmueble,
} from '../models';
import {BloqueRepository} from '../repositories';

export class BloqueInmuebleController {
  constructor(
    @repository(BloqueRepository) protected bloqueRepository: BloqueRepository,
  ) { }

  @get('/bloques/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Bloque has many Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble[]> {
    return this.bloqueRepository.inmuebles(id).find(filter);
  }

  @post('/bloques/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Bloque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Bloque.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInBloque',
            exclude: ['id'],
            optional: ['bloqueId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.bloqueRepository.inmuebles(id).create(inmueble);
  }

  @patch('/bloques/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Bloque.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Partial<Inmueble>,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.bloqueRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/bloques/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Bloque.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.bloqueRepository.inmuebles(id).delete(where);
  }
}
