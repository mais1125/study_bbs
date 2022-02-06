import { Component } from '@angular/core';
import { API_ENDPOINT, Category } from '@common/models';
import { ApiService } from './service/api.service';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public categoryItem!: Category[];
  categoryies: Category[] = [];

  constructor(
    private apiService: ApiService,
    private categoryService: CategoryService
  ) {}

  //   async ngAfterViewInit(): Promise<void> {
  //     const url = API_ENDPOINT.THREADALL_READ;
  //     await this.apiService
  //       .get(url)
  //       .toPromise()
  //       .then((i) => {
  //         this.categoryies = i as Category[];
  //         this.categoryItem = this.categoryies;
  //         this.categoryService.myCategoriesSec(this.categoryies);
  //       });
  //   }
  // }
}
