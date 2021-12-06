import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { API_ENDPOINT } from 'apps/common/interfaces/interface/controller/endpoints.interface';
import { Category } from 'apps/common/interfaces/interface/entities/category.interface';
import { ApiService } from '../../service/api.service';
import { HttpParams } from '@angular/common/http';
import { Thread } from 'apps/common/interfaces/interface/entities/thread.interface';
import { PAGE } from '../../app-routig.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BoardCreate } from '../../../../../common/interfaces/interface/controller/board.interface';

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

  /** 投稿用Modal表示フラグ */
  createForm = new FormGroup({
    /** タイトル */
    title: new FormControl('', Validators.required),
    /** 名前 */
    name: new FormControl('', Validators.required),
    /** 本文 */
    text: new FormControl('', Validators.required),
    /** 編集キー */
    editkey: new FormControl('', Validators.required),
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
    const url = API_ENDPOINT.CATEGORY;
    const options = {
      params: new HttpParams().set('id', id),
    };
    const res = await this.apiService
      .get(url, options)
      .toPromise()
      .then((i) => (this.category = i as Category));
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
   * 新規投稿用Modalの切り替え
   */
  switchModal(): void {
    this.display = !this.display;
  }

  /**
   * 新規投稿送信
   */
  async create(): Promise<void> {
    const req: BoardCreate = {
      title: this.createForm.value.title,
      name: this.createForm.value.name,
      text: this.createForm.value.text,
      editkey: this.createForm.value.editkey,
      cid: { id: this.category.id } as Category,
    };
    // 投稿
    await this.apiService
      .post<BoardCreate, BoardCreate>(API_ENDPOINT.MESSAGE, req)
      .toPromise()
      .then(() => this.createForm.reset());
    // スレッドの再取得
    await this.getCategory(req.cid?.id as number);
    // Modalを閉じる
    this.switchModal();
  }
}
