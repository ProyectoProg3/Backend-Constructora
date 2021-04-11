import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Bloque, SolicitudClienteInmueble} from '../models';
import {BloqueRepository} from './bloque.repository';
import {SolicitudClienteInmuebleRepository} from './solicitud-cliente-inmueble.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly bloque: BelongsToAccessor<Bloque, typeof Inmueble.prototype.id>;

  public readonly solicitudesClienteInmueble: HasManyRepositoryFactory<SolicitudClienteInmueble, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>, @repository.getter('SolicitudClienteInmuebleRepository') protected solicitudClienteInmuebleRepositoryGetter: Getter<SolicitudClienteInmuebleRepository>,
  ) {
    super(Inmueble, dataSource);
    this.solicitudesClienteInmueble = this.createHasManyRepositoryFactoryFor('solicitudesClienteInmueble', solicitudClienteInmuebleRepositoryGetter,);
    this.registerInclusionResolver('solicitudesClienteInmueble', this.solicitudesClienteInmueble.inclusionResolver);
    this.bloque = this.createBelongsToAccessorFor('bloque', bloqueRepositoryGetter,);
    this.registerInclusionResolver('bloque', this.bloque.inclusionResolver);
  }
}
