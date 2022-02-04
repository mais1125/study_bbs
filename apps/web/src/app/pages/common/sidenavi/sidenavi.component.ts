import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@common/models';
import { PAGE } from '../../../app-routig.module';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'project-sidenavi',
  templateUrl: './sidenavi.component.html',
  styleUrls: ['./sidenavi.component.scss'],
})
export class SidenaviComponent {
  // app.componentで取得した値を受け取る
  @Input() categories: Category[] = [];

  constructor(private apiService: ApiService, public router: Router) {}
  /**
   * カテゴリーページへ遷移
   */
  onClick(id: Category): void {
    this.router.navigate([PAGE.CATEGORY], {
      queryParams: { id: id.id },
      queryParamsHandling: 'merge',
    });
  }
}
