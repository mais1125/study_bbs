import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Thread, API_ENDPOINT, Category } from '@common/models';
import { Router } from '@angular/router';
import { PAGE } from '../../app-routig.module';

@Component({
  selector: 'project-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  threads: Thread[] = [];
  categoryies: Category[] = [];

  // // 求めるデータ
  // categoryies = [
  //   {
  //     id: 1,
  //     name: 'カテゴリA',
  //     theards: [{}, {}, {}, {}, {}],
  //   },
  //   {
  //     id: 2,
  //     name: 'カテゴリB',
  //     theards: [{}, {}, {}, {}, {}],
  //   },
  //   {
  //     id: 3,
  //     name: 'カテゴリC',
  //     theards: [{}, {}, {}, {}, {}],
  //   },
  // ];

  constructor(private apiService: ApiService, public router: Router) {}

  async ngOnInit(): Promise<void> {
    const url = API_ENDPOINT.THREADS_READ;
    await this.apiService
      .get(url)
      .toPromise()
      .then((i) => {
        this.categoryies = i as Category[];
      });
    this.categoryies.reverse();
  }

  /**
   * 各カテゴリーのページへ遷移
   */
  onClick(id: Thread): void {
    this.router.navigate([PAGE.THREAD], {
      queryParams: { id: id.id },
      queryParamsHandling: 'merge',
    });
  }
}
