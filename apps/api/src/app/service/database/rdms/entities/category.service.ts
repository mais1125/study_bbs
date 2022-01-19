import { Injectable } from '@nestjs/common';
import { AbstractRDBMSService } from '../abstract.service';
import { CategoryEntity } from '@entities';
import { Category } from '@common/models';

@Injectable()
export class CategoryEntityService extends AbstractRDBMSService<Category> {
  constructor() {
    super(CategoryEntity.name);
  }
}
