import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ThreadEntity } from '.';
import {
  Category,
  CATEGORY_TYPE,
} from '../../../../../common/interfaces/interface/entities/category.interface';
import { Thread } from '../../../../../common/interfaces/interface/entities/thread.interface';

@Entity('Categories')
export class CategoryEntity implements Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { comment: 'カテゴリー', enum: CATEGORY_TYPE })
  name: typeof CATEGORY_TYPE[keyof typeof CATEGORY_TYPE];

  @OneToMany(() => ThreadEntity, (thread) => thread.cid)
  thread?: Thread[];
}
