import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINT, Category } from '@common/models';
import { Subscription } from 'rxjs';
import { PAGE } from '../../../app-routig.module';
import { ApiService } from '../../../service/api.service';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'project-sidenavi',
  templateUrl: './sidenavi.component.html',
  styleUrls: ['./sidenavi.component.scss'],
})
export class SidenaviComponent implements OnInit {
  // main.componentで取得した値を受け取る
  subscription!: Subscription;
  categories: Category[] = [];

  constructor(
    private apiService: ApiService,
    public router: Router,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    const url = API_ENDPOINT.THREADALL_READ;
    this.apiService
      .get(url)
      .toPromise()
      .then((i) => {
        this.categories = i as Category[];
        this.categories.reverse();
        this.categoryService.myCategoriesSec(this.categories);
      });
  }

  /**
   * カテゴリーページへ遷移
   */
  onClick(id: Category): void {
    this.router.navigate([PAGE.CATEGORY], {
      queryParams: { id: id.id },
      queryParamsHandling: 'merge',
    });
  }
}
