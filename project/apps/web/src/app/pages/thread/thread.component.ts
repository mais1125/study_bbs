import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { API_ENDPOINT } from 'apps/common/interfaces/interface/controller/endpoints.interface';
import { Thread } from 'apps/common/interfaces/interface/entities/thread.interface';
import { ResCreate } from '../../../../../common/interfaces/interface/controller/res.interface';
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
  display = false;

  resForm = new FormGroup({
    text: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    editkye: new FormControl('', Validators.required),
  });

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

  /**
   *  スレッドを取得
   */
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

  /**
   * レス投稿用Modal
   */
  modal(): void {
    this.display = true;
  }

  /**
   * レス投稿送信
   */
  create(): void {
    const req: ResCreate = {
      text: this.resForm.value.text,
      name: this.resForm.value.name,
      editkey: this.resForm.value.editkye,
      tid: { id: this.thread.id } as Thread,
    };
    this.apiService
      .post<ResCreate, ResCreate>(API_ENDPOINT.RES, req)
      .subscribe();
    this.display = false;
  }
}
