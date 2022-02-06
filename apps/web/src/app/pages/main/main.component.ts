import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Thread, Category, API_ENDPOINT } from '@common/models';
import { Router } from '@angular/router';
import { PAGE } from '../../app-routig.module';

// service
import { SessionService } from '../../service/session.service';
import { CategoryService } from '../../service/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'project-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  threads: Thread[] = [];
  categories: Category[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private sessionService: SessionService,
    private categoryService: CategoryService
  ) {
    this.subscription = this.categoryService.myCategoriesRec.subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }

  ngOnInit(): void {
    // パンくずリスト
    this.sessionService.myBreadCrumbsSec([{}]);
  }

  ngOnDestroy(): void {
    // 購読廃棄
    this.subscription.unsubscribe();
  }

  /**
   * 各スレッドのページへ遷移
   */
  onClick(id: Thread): void {
    this.router.navigate([PAGE.THREAD], {
      queryParams: { id: id.id },
    });
  }
}
