import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINT } from 'apps/common/interfaces/interface/controller/endpoints.interface';
import { Category } from 'apps/common/interfaces/interface/entities/category.interface';
import { PAGE } from '../../../app-routig.module';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'project-sidenavi',
  templateUrl: './sidenavi.component.html',
  styleUrls: ['./sidenavi.component.scss'],
})
export class SidenaviComponent implements OnInit {
  categories: Category[] = [];

  constructor(private apiService: ApiService, public router: Router) {}
  /**
   * ngOnInitでカテゴリーを取得
   */
  async ngOnInit(): Promise<void> {
    const url = API_ENDPOINT.CATEGORIES_READ;
    await this.apiService
      .get(url)
      .toPromise()
      .then((i) => (this.categories = i as Category[]));
  }

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
