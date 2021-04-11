import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Pago, PagoRelations, SolicitudClienteInmueble} from '../models';
import {SolicitudClienteInmuebleRepository} from './solicitud-cliente-inmueble.repository';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.id,
  PagoRelations
> {

  public readonly solicitudClienteInmueble: BelongsToAccessor<SolicitudClienteInmueble, typeof Pago.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudClienteInmuebleRepository') protected solicitudClienteInmuebleRepositoryGetter: Getter<SolicitudClienteInmuebleRepository>,
  ) {
    super(Pago, dataSource);
    this.solicitudClienteInmueble = this.createBelongsToAccessorFor('solicitudClienteInmueble', solicitudClienteInmuebleRepositoryGetter,);
    this.registerInclusionResolver('solicitudClienteInmueble', this.solicitudClienteInmueble.inclusionResolver);
  }
}
