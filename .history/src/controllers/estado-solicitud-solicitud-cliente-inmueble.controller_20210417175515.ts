import { authenticate } from '@loopback/authentication';
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
  EstadoSolicitud,
  SolicitudClienteInmueble,
} from '../models';
import {EstadoSolicitudRepository} from '../repositories';

@authenticate('admin', 'vendedor')
export class EstadoSolicitudSolicitudClienteInmuebleController {
  constructor(
    @repository(EstadoSolicitudRepository) protected estadoSolicitudRepository: EstadoSolicitudRepository,
  ) { }

  @get('/estado-solicituds/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'Array of EstadoSolicitud has many SolicitudClienteInmueble',
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
    return this.estadoSolicitudRepository.solicitudesClienteInmueble(id).find(filter);
  }

  @post('/estado-solicituds/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'EstadoSolicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudClienteInmueble)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EstadoSolicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudClienteInmueble, {
            title: 'NewSolicitudClienteInmuebleInEstadoSolicitud',
            exclude: ['id'],
            optional: ['estadoSolicitudId']
          }),
        },
      },
    }) solicitudClienteInmueble: Omit<SolicitudClienteInmueble, 'id'>,
  ): Promise<SolicitudClienteInmueble> {
    return this.estadoSolicitudRepository.solicitudesClienteInmueble(id).create(solicitudClienteInmueble);
  }

  @patch('/estado-solicituds/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'EstadoSolicitud.SolicitudClienteInmueble PATCH success count',
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
    return this.estadoSolicitudRepository.solicitudesClienteInmueble(id).patch(solicitudClienteInmueble, where);
  }

  @del('/estado-solicituds/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'EstadoSolicitud.SolicitudClienteInmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudClienteInmueble)) where?: Where<SolicitudClienteInmueble>,
  ): Promise<Count> {
    return this.estadoSolicitudRepository.solicitudesClienteInmueble(id).delete(where);
  }
}
