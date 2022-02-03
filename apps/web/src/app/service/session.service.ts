import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  // やり取りするための道を作る
  myBreadCrumbs = new Subject<MenuItem[]>();

  // 受け取る側の定義
  myBreadCrumbsRec = this.myBreadCrumbs.asObservable();

  // 送る側の定義
  myBreadCrumbsSec(param: MenuItem[]): void {
    this.myBreadCrumbs.next(param);
  }
}
