import { AbstractRepository, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @CreateDateColumn()
  created?: Date

  @UpdateDateColumn()
  updated?: Date
}

export abstract class BaseRepository<T> extends AbstractRepository<T> {
  protected normailze(entity: Partial<T>) {
    return { ...entity }
  }
  public query() {
    return this.repository.createQueryBuilder()
  }
  public async save(entity: Partial<T>): Promise<T> {
    const normalized = <T>this.normailze(entity)
    return this.repository.save(normalized)
  }
  public async findOne(id: string): Promise<T> {
    return this.repository.findOne(id)
  }
  public async findOneOrFail(id: string): Promise<T> {
    return this.repository.findOneOrFail(id)
  }
  public async findAll(criteria: Partial<T>): Promise<T[]> {
    return this.repository.find(criteria)
  }
}
