import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category, CATEGORY_TYPE } from '../../interface/category.interface';

@Entity('Categories')
export class CategoryEntity implements Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { comment: 'カテゴリー', enum: CATEGORY_TYPE })
  name: typeof CATEGORY_TYPE[keyof typeof CATEGORY_TYPE];
}
