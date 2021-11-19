import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { API_ENDPOINT } from 'apps/common/interfaces/interface/controller/endpoints.interface';
import { Category } from 'apps/common/interfaces/interface/entities/category.interface';
import { ApiService } from '../../service/api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'project-ctegory',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  category!: Category;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.subscription = this.route.queryParams.subscribe((params) => {
      this.getCategory(params.id);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async getCategory(id: number): Promise<void> {
    const url = API_ENDPOINT.CATEGORY;
    const options = {
      params: new HttpParams().set('id', id),
    };
    await this.apiService
      .get(url, options)
      .toPromise()
      .then((i) => (this.category = i as Category));
  }
}
