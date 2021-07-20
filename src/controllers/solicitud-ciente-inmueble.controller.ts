import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {SolicitudClienteInmueble} from '../models';
import {SolicitudClienteInmuebleRepository} from '../repositories';

@authenticate('admin', 'vendedor')
export class SolicitudCienteInmuebleController {
  constructor(
    @repository(SolicitudClienteInmuebleRepository)
    public solicitudClienteInmuebleRepository: SolicitudClienteInmuebleRepository,
  ) { }

  @post('/solicitud-cliente-inmueble')
  @response(200, {
    description: 'SolicitudClienteInmueble model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudClienteInmueble)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudClienteInmueble, {
            title: 'NewSolicitudClienteInmueble',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudClienteInmueble: Omit<SolicitudClienteInmueble, 'id'>,
  ): Promise<SolicitudClienteInmueble> {
    return this.solicitudClienteInmuebleRepository.create(solicitudClienteInmueble);
  }

  @get('/solicitud-cliente-inmueble/count')
  @response(200, {
    description: 'SolicitudClienteInmueble model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudClienteInmueble) where?: Where<SolicitudClienteInmueble>,
  ): Promise<Count> {
    return this.solicitudClienteInmuebleRepository.count(where);
  }

  @get('/solicitud-cliente-inmueble')
  @response(200, {
    description: 'Array of SolicitudClienteInmueble model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudClienteInmueble, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudClienteInmueble) filter?: Filter<SolicitudClienteInmueble>,
  ): Promise<SolicitudClienteInmueble[]> {
    return this.solicitudClienteInmuebleRepository.find(filter);
  }
  @authenticate('admin', 'vendedor')
  @patch('/solicitud-cliente-inmueble')
  @response(200, {
    description: 'SolicitudClienteInmueble PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudClienteInmueble, {partial: true}),
        },
      },
    })
    solicitudClienteInmueble: SolicitudClienteInmueble,
    @param.where(SolicitudClienteInmueble) where?: Where<SolicitudClienteInmueble>,
  ): Promise<Count> {
    return this.solicitudClienteInmuebleRepository.updateAll(solicitudClienteInmueble, where);
  }

  @get('/solicitud-cliente-inmueble/{id}')
  @response(200, {
    description: 'SolicitudClienteInmueble model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudClienteInmueble, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SolicitudClienteInmueble, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudClienteInmueble>
  ): Promise<SolicitudClienteInmueble> {
    return this.solicitudClienteInmuebleRepository.findById(id, filter);
  }
  @authenticate('admin', 'vendedor')
  @patch('/solicitud-cliente-inmueble/{id}')
  @response(204, {
    description: 'SolicitudClienteInmueble PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudClienteInmueble, {partial: true}),
        },
      },
    })
    solicitudClienteInmueble: SolicitudClienteInmueble,
  ): Promise<void> {
    await this.solicitudClienteInmuebleRepository.updateById(id, solicitudClienteInmueble);
  }
  @authenticate('admin', 'vendedor')
  @put('/solicitud-cliente-inmueble/{id}')
  @response(204, {
    description: 'SolicitudClienteInmueble PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitudClienteInmueble: SolicitudClienteInmueble,
  ): Promise<void> {
    await this.solicitudClienteInmuebleRepository.replaceById(id, solicitudClienteInmueble);
  }
  @authenticate('admin', 'vendedor')
  @del('/solicitud-cliente-inmueble/{id}')
  @response(204, {
    description: 'SolicitudClienteInmueble DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudClienteInmuebleRepository.deleteById(id);
  }
}
