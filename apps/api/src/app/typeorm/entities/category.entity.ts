import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ThreadEntity } from '@entities';
import { Category, CATEGORY_TYPE, Thread } from 'apps/common/models/_index';

@Entity('Categories')
export class CategoryEntity implements Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { comment: 'カテゴリー', enum: CATEGORY_TYPE })
  name: typeof CATEGORY_TYPE[keyof typeof CATEGORY_TYPE];

  @OneToMany(() => ThreadEntity, (thread) => thread.cid)
  thread?: Thread[];
}
