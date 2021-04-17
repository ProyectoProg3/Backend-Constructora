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
  Pais,
  Ciudad,
} from '../models';
import {PaisRepository} from '../repositories';

export class PaisCiudadController {
  constructor(
    @repository(PaisRepository) protected paisRepository: PaisRepository,
  ) { }

  @get('/pais/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Array of Pais has many Ciudad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Ciudad>,
  ): Promise<Ciudad[]> {
    return this.paisRepository.ciudades(id).find(filter);
  }

  @post('/pais/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Pais model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pais.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudadInPais',
            exclude: ['id'],
            optional: ['paisId']
          }),
        },
      },
    }) ciudad: Omit<Ciudad, 'id'>,
  ): Promise<Ciudad> {
    return this.paisRepository.ciudades(id).create(ciudad);
  }

  @patch('/pais/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Pais.Ciudad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Partial<Ciudad>,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.paisRepository.ciudades(id).patch(ciudad, where);
  }

  @del('/pais/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Pais.Ciudad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.paisRepository.ciudades(id).delete(where);
  }
}
