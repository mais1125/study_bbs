import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { API_ENDPOINT, Category } from '@common/models';
import { ApiService } from './service/api.service';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private apiService: ApiService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // TOPの場合は記事を再取得
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.apiService
          .get<Category[]>(API_ENDPOINT.THREADALL_READ)
          .toPromise()
          .then((i) => {
            this.categoryService.myCategoriesSec(i);
          });
      }
    });
  }
}
