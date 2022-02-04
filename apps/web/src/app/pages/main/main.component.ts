import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Thread, API_ENDPOINT, Category } from '@common/models';
import { Router } from '@angular/router';
import { PAGE } from '../../app-routig.module';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'project-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  threads: Thread[] = [];

  // app.componentで取得した値を受け取る
  @Input() categoryies: Category[] = [];

  constructor(
    private apiService: ApiService,
    public router: Router,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
    // パンくずリスト
    this.sessionService.myBreadCrumbsSec([{}]);

    // const url = API_ENDPOINT.THREADALL_READ;
    // this.apiService
    //   .get(url)
    //   .toPromise()
    //   .then((i) => {
    //     this.categoryies = i as Category[];
    //     this.categoryies.reverse();
    //   });
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
