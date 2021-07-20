import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Cliente,
  SolicitudClienteInmueble
} from '../models';
import {ClienteRepository} from '../repositories';


export class ClienteSolicitudClienteInmuebleController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'Array of Cliente has many SolicitudClienteInmueble',
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
    return this.clienteRepository.solicitudesClienteInmueble(id).find(filter);
  }

  @post('/clientes/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudClienteInmueble)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudClienteInmueble, {
            title: 'NewSolicitudClienteInmuebleInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) solicitudClienteInmueble: Omit<SolicitudClienteInmueble, 'id'>,
  ): Promise<SolicitudClienteInmueble> {
    return this.clienteRepository.solicitudesClienteInmueble(id).create(solicitudClienteInmueble);
  }

  @patch('/clientes/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudClienteInmueble PATCH success count',
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
    return this.clienteRepository.solicitudesClienteInmueble(id).patch(solicitudClienteInmueble, where);
  }

  @del('/clientes/{id}/solicitud-cliente-inmuebles', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudClienteInmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudClienteInmueble)) where?: Where<SolicitudClienteInmueble>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudesClienteInmueble(id).delete(where);
  }
}
