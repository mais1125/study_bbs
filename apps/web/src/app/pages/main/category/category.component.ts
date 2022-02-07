import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../service/api.service';
import { HttpParams } from '@angular/common/http';
import { PAGE } from '../../../app-routig.module';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// interfaces
import { Thread, Category, BoardCreate, API_ENDPOINT } from '@common/models';
// service
import { SessionService } from '../../../service/session.service';

// createForm用Type
type createFormControls = {
  [key in keyof BoardCreate]: AbstractControl;
};
type createFormGroup = FormGroup & {
  controls: createFormControls;
};

@Component({
  selector: 'project-ctegory',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  category!: Category;
  /** 投稿用Modal表示フラグ */
  display = false;

  /** 投稿FormGroup */
  createForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    text: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    editkey: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(6),
    ]),
  } as createFormControls) as createFormGroup;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public router: Router,
    private sessionService: SessionService
  ) {}

  /**
   * クエリパラメーターを取得
   */
  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((params) => {
      this.getCategory(params.id);
    });
  }

  /**
   * コンポーネントを離れる時にsubscribeを破棄
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * カテゴリーの値を取得
   */
  async getCategory(id: number): Promise<void> {
    const options = {
      params: new HttpParams().set('id', id),
    };
    const res = await this.apiService
      .get<Category>(API_ENDPOINT.CATEGORY_READ, options)
      .toPromise()
      .then((i) => {
        this.category = i;
        return this.category;
      });
    // パンくずリストへ値を送る
    this.sessionService.myBreadCrumbsSec([{ label: this.category.name }]);
    res.thread?.reverse();
  }

  /**
   * 各スレッドのページへ遷移
   */
  onClick(id: Thread): void {
    this.router.navigate([PAGE.THREAD], {
      queryParams: { id: id.id },
      queryParamsHandling: 'merge',
    });
  }

  /**
   * 新規投稿送信
   */
  async create(): Promise<void> {
    const req: BoardCreate = {
      title: this.createForm.controls.title.value,
      name: this.createForm.controls.name.value,
      text: this.createForm.controls.text.value,
      editkey: this.createForm.controls.editkey.value,
      cid: { id: this.category.id } as Category,
    };
    // 投稿
    await this.apiService
      .post<BoardCreate>(API_ENDPOINT.THREAD_CREATE, req)
      .toPromise()
      .then(() => this.createForm.reset());
    // スレッドの再取得
    await this.getCategory(req.cid?.id as number);
    // Modalを閉じる
    this.switchModal();
  }

  /**
   * 新規投稿用Modalの切り替え
   */
  switchModal(): void {
    this.display = !this.display;
    this.createForm.reset();
  }
}
