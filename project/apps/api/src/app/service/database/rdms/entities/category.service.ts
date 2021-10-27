import { Injectable } from '@nestjs/common';
import { AbstractRDBMSService } from '../abstract.service';
import { CategoryEntity } from '../../../../typeorm/entities';
import { Category } from '../../../../interface/category.interface';

@Injectable()
export class CategoryEntityService extends AbstractRDBMSService<Category> {
  constructor() {
    super(CategoryEntity.name);
  }
}
