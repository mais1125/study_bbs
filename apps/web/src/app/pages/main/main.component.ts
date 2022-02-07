import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Thread, Category } from '@common/models';
import { Router } from '@angular/router';
import { PAGE } from '../../app-routig.module';

// service
import { SessionService } from '../../service/session.service';
import { RxJSService } from '../../service/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'project-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {
  subscription!: Subscription;
  threads: Thread[] = [];
  lsit: Category[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private sessionService: SessionService,
    private rxjsService: RxJSService
  ) {
    this.subscription = this.rxjsService.myCategoriesRec.subscribe((data) => {
      this.lsit = JSON.parse(JSON.stringify(data));
      this.lsit.reverse();
    });
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
