import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ThreadEntity } from '@entities';
import { CATEGORY_TYPE, _CategoryEntity } from '@common/models';

@Entity('Categories')
export class CategoryEntity implements _CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { comment: 'カテゴリー', enum: CATEGORY_TYPE })
  name: typeof CATEGORY_TYPE[keyof typeof CATEGORY_TYPE];

  @OneToMany(() => ThreadEntity, (thread) => thread.cid)
  thread?: ThreadEntity[];
}
