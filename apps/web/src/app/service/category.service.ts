import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '@common/models';

@Injectable({
  providedIn: 'root',
})
export class RxJSService {
  myCategories = new Subject<Category[]>();

  myCategoriesRec = this.myCategories.asObservable();

  myCategoriesSec(params: Category[]): void {
    this.myCategories.next(params);
  }
}
