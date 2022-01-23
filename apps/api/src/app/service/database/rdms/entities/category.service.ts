import { Injectable } from '@nestjs/common';
import { AbstractRDBMSService } from '../abstract.service';
import { CategoryEntity } from '@entities';

@Injectable()
export class CategoryEntityService extends AbstractRDBMSService<CategoryEntity> {
  constructor() {
    super(CategoryEntity.name);
  }
}
