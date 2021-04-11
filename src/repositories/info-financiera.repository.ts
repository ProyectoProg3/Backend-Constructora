import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {InfoFinanciera, InfoFinancieraRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class InfoFinancieraRepository extends DefaultCrudRepository<
  InfoFinanciera,
  typeof InfoFinanciera.prototype.id,
  InfoFinancieraRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof InfoFinanciera.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(InfoFinanciera, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
