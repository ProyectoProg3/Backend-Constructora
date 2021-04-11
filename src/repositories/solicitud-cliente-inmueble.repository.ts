import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudClienteInmueble, SolicitudClienteInmuebleRelations, Cliente, Inmueble, Pago, EstadoSolicitud} from '../models';
import {ClienteRepository} from './cliente.repository';
import {InmuebleRepository} from './inmueble.repository';
import {PagoRepository} from './pago.repository';
import {EstadoSolicitudRepository} from './estado-solicitud.repository';

export class SolicitudClienteInmuebleRepository extends DefaultCrudRepository<
  SolicitudClienteInmueble,
  typeof SolicitudClienteInmueble.prototype.id,
  SolicitudClienteInmuebleRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof SolicitudClienteInmueble.prototype.id>;

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof SolicitudClienteInmueble.prototype.id>;

  public readonly pago: BelongsToAccessor<Pago, typeof SolicitudClienteInmueble.prototype.id>;

  public readonly estadoSolicitud: BelongsToAccessor<EstadoSolicitud, typeof SolicitudClienteInmueble.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>, @repository.getter('EstadoSolicitudRepository') protected estadoSolicitudRepositoryGetter: Getter<EstadoSolicitudRepository>,
  ) {
    super(SolicitudClienteInmueble, dataSource);
    this.estadoSolicitud = this.createBelongsToAccessorFor('estadoSolicitud', estadoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('estadoSolicitud', this.estadoSolicitud.inclusionResolver);
    this.pago = this.createBelongsToAccessorFor('pago', pagoRepositoryGetter,);
    this.registerInclusionResolver('pago', this.pago.inclusionResolver);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
