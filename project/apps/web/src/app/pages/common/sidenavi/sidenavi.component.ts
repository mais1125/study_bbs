import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINT } from 'apps/common/interfaces/interface/controller/endpoints.interface';
import { Category } from 'apps/common/interfaces/interface/entities/category.interface';
import { PAGE_URI } from '../../../app-routig.module';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'project-sidenavi',
  templateUrl: './sidenavi.component.html',
  styleUrls: ['./sidenavi.component.scss'],
})
export class SidenaviComponent implements OnInit {
  categories: Category[] = [];

  constructor(private apiService: ApiService, public router: Router) {}
  async ngOnInit(): Promise<void> {
    const url = API_ENDPOINT.CATEGORIES;
    await this.apiService
      .get(url)
      .toPromise()
      .then((i) => (this.categories = i as Category[]));
  }

  /**
   * メインページへ遷移
   */
  main(): void {
    this.router.navigateByUrl(PAGE_URI.MAIN);
  }

  /**
   * カテゴリーページへ遷移
   */
  onClick(id: Category): void {
    this.router.navigate(['./category'], {
      queryParams: { id: id.id },
      queryParamsHandling: 'merge',
    });
  }
}
