import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../service/api.service';
// entities interfaces
import { Thread, Message } from '@interface/entities';
// controllers interfaces
import {
  ResCreate,
  ResponseInterface,
  API_ENDPOINT,
} from '@interface/controllers';
import { PAGE } from '../../app-routig.module';

@Component({
  selector: 'project-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  /** スレッド */
  thread!: Thread;
  /** 編集 */
  editMessage!: Message;
  /** 投稿用Modal表示フラグ */
  createDisplay = false;
  /** 編集用Modal表示フラグ */
  editDisplay = false;
  /** 実行結果の受け取り */
  response!: ResponseInterface;

  /** 返信用FormGroup */
  resForm = new FormGroup({
    /** 名前 */
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    /** 本文 */
    text: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    /** 編集キー */
    editkye: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(6),
    ]),
  });

  /** 編集FormGroup */
  editForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    text: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    editkey: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(6),
    ]),
  });

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

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
      .get<{ params: HttpParams }, Thread>(url, options)
      .toPromise()
      .then((res) => {
        if (!res) {
          this.router.navigateByUrl(
            `${PAGE.CATEGORY}?id=${this.thread.cid?.id}`
          );
        } else {
          this.thread = this.sortMessage(res);
        }
      });
  }

  /**
   * メッセージのソート
   */
  sortMessage(res: Thread): Thread {
    res.message.sort(function (a, b) {
      let sortRes;
      if (b.id === res.message[0].id) {
        sortRes = (a.id as number) < (b.id as number) ? -1 : 1;
      } else {
        sortRes = (a.id as number) < (b.id as number) ? 1 : -1;
      }
      return sortRes;
    });
    return res;
  }

  /**
   * 新規投稿用Modalの切り替え
   */
  createModal(): void {
    this.createDisplay = !this.createDisplay;
  }

  /**
   * レス投稿送信
   */
  async create(): Promise<void> {
    const req: ResCreate = {
      text: this.resForm.value.text,
      name: this.resForm.value.name,
      editkey: this.resForm.value.editkye,
      tid: { id: this.thread.id } as Thread,
    };
    await this.apiService
      .post<ResCreate, ResCreate>(API_ENDPOINT.RES, req)
      .toPromise()
      .then(() => this.resForm.reset());

    await this.getThread(req.tid.id as number);
    this.createModal();
  }

  /**
   * 編集投稿用Modalの切り替え
   */
  editModal(): void {
    this.editDisplay = !this.editDisplay;
  }

  /**
   * 編集用Modal実装
   */
  update(message: Message): void {
    this.editMessage = message;
    this.editModal();
  }

  /**
   * レスの編集
   */
  async edit(): Promise<void> {
    const req: Message = {
      id: this.editMessage.id,
      text: this.editMessage.text,
      name: this.editMessage.name,
      editkey: this.editMessage.editkey,
      tid: { id: this.thread.id } as Thread,
    };
    await this.apiService
      .post<Message, ResponseInterface>(API_ENDPOINT.EDIT, req)
      .toPromise()
      .then(
        (res) => ((this.response = res), (this.editForm.value.editkey = ''))
      );

    if (this.response.status) {
      // status=true
      await this.getThread(this.thread.id as number);
      this.editModal();
    } else {
      // status=false
      this.response.message;
    }
  }

  /**
   * レスの削除
   */
  async deleteMessage(message: Message): Promise<void> {
    await this.apiService
      .post<Message, ResponseInterface>(API_ENDPOINT.DELETE_MESSAGE, message)
      .toPromise()
      .then((res) => (this.response = res));
    if (this.response.status) {
      // status=true
      await this.getThread(this.thread.id as number);
      this.editModal();
    }
    // status=false
    this.response.message;
  }
}
