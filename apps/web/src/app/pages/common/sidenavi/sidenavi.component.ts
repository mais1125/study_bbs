import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class SidenaviComponent implements OnDestroy {
  // main.componentで取得した値を受け取る
  subscription!: Subscription;
  categories: Category[] = [];

  constructor(public router: Router, private categoryService: CategoryService) {
    this.subscription = this.categoryService.myCategoriesRec.subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }

  ngOnDestroy(): void {
    // 購読廃棄
    this.subscription.unsubscribe();
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
