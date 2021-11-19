import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_ENDPOINT } from 'apps/common/interfaces/interface/controller/endpoints.interface';
import { Category } from 'apps/common/interfaces/interface/entities/category.interface';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'project-ctegory',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category!: Category;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const res = c; // this.route.queryParams.subscribe((params) => {
    //   console.log(params);
    //   this.category = params.cid;
    //   console.log(this.category);
    // });
  }

  async getCategory(category: Category): Promise<void> {
    const url = API_ENDPOINT.CATEGORY;
    await this.apiService
      .get(url, category.id)
      .toPromise()
      .then((i) => (this.category = i as Category));
  }
}
