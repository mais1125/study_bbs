import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_ENDPOINT } from 'apps/common/interfaces/interface/controller/endpoints.interface';
import { Thread } from 'apps/common/interfaces/interface/entities/thread.interface';
import { Subscription } from 'rxjs';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'project-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  thread!: Thread;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  /**
   * クエリパラメーターを取得
   */
  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((params) => {
      this.getThread(params.id);
    });
  }

  /**
   * コンポーネントを離れる時にsubscribeを破棄
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async getThread(id: number): Promise<void> {
    const url = API_ENDPOINT.THREAD;
    const options = {
      params: new HttpParams().set('id', id),
    };
    await this.apiService
      .get(url, options)
      .toPromise()
      .then((i) => (this.thread = i as Thread));
  }
}
