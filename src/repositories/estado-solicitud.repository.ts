import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EstadoSolicitud, EstadoSolicitudRelations, SolicitudClienteInmueble} from '../models';
import {SolicitudClienteInmuebleRepository} from './solicitud-cliente-inmueble.repository';

export class EstadoSolicitudRepository extends DefaultCrudRepository<
  EstadoSolicitud,
  typeof EstadoSolicitud.prototype.id,
  EstadoSolicitudRelations
> {

  public readonly solicitudesClienteInmueble: HasManyRepositoryFactory<SolicitudClienteInmueble, typeof EstadoSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudClienteInmuebleRepository') protected solicitudClienteInmuebleRepositoryGetter: Getter<SolicitudClienteInmuebleRepository>,
  ) {
    super(EstadoSolicitud, dataSource);
    this.solicitudesClienteInmueble = this.createHasManyRepositoryFactoryFor('solicitudesClienteInmueble', solicitudClienteInmuebleRepositoryGetter,);
    this.registerInclusionResolver('solicitudesClienteInmueble', this.solicitudesClienteInmueble.inclusionResolver);
  }
}
