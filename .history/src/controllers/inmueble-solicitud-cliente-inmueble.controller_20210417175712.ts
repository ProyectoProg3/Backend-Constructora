import {authenticate} from '@loopback/authentication';

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
  Inmueble,
  SolicitudClienteInmueble,
} from '../models';
import {InmuebleRepository} from '../repositories';

@authenticate('admin', 'vendedor')
export class InmuebleSolicitudClienteInmuebleController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'Array of Inmueble has many SolicitudClienteInmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudClienteInmueble)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SolicitudClienteInmueble>,
  ): Promise<SolicitudClienteInmueble[]> {
    return this.inmuebleRepository.solicitudesClienteInmueble(id).find(filter);
  }

  @post('/inmuebles/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudClienteInmueble)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudClienteInmueble, {
            title: 'NewSolicitudClienteInmuebleInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) solicitudClienteInmueble: Omit<SolicitudClienteInmueble, 'id'>,
  ): Promise<SolicitudClienteInmueble> {
    return this.inmuebleRepository.solicitudesClienteInmueble(id).create(solicitudClienteInmueble);
  }

  @patch('/inmuebles/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'Inmueble.SolicitudClienteInmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudClienteInmueble, {partial: true}),
        },
      },
    })
    solicitudClienteInmueble: Partial<SolicitudClienteInmueble>,
    @param.query.object('where', getWhereSchemaFor(SolicitudClienteInmueble)) where?: Where<SolicitudClienteInmueble>,
  ): Promise<Count> {
    return this.inmuebleRepository.solicitudesClienteInmueble(id).patch(solicitudClienteInmueble, where);
  }

  @del('/inmuebles/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'Inmueble.SolicitudClienteInmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudClienteInmueble)) where?: Where<SolicitudClienteInmueble>,
  ): Promise<Count> {
    return this.inmuebleRepository.solicitudesClienteInmueble(id).delete(where);
  }
}
