import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Ciudad, Cliente, ClienteRelations, SolicitudClienteInmueble} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {InfoFinancieraRepository} from './info-financiera.repository';
import {SolicitudClienteInmuebleRepository} from './solicitud-cliente-inmueble.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Cliente.prototype.id>;

  public readonly solicitudesClienteInmueble: HasManyRepositoryFactory<SolicitudClienteInmueble, typeof Cliente.prototype.id>;


  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('SolicitudClienteInmuebleRepository') protected solicitudClienteInmuebleRepositoryGetter: Getter<SolicitudClienteInmuebleRepository>, @repository.getter('InfoFinancieraRepository') protected infoFinancieraRepositoryGetter: Getter<InfoFinancieraRepository>,
  ) {
    super(Cliente, dataSource);

    this.solicitudesClienteInmueble = this.createHasManyRepositoryFactoryFor('solicitudesClienteInmueble', solicitudClienteInmuebleRepositoryGetter,);
    this.registerInclusionResolver('solicitudesClienteInmueble', this.solicitudesClienteInmueble.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
