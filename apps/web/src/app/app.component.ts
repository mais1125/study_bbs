import { Component, OnInit } from '@angular/core';
import { API_ENDPOINT, Category } from '@common/models';
import { ApiService } from './service/api.service';

@Component({
  selector: 'project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public categoryItem!: Category[];
  categoryies: Category[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const url = API_ENDPOINT.THREADALL_READ;
    this.apiService
      .get(url)
      .toPromise()
      .then((i) => {
        this.categoryies = i as Category[];
        this.categoryies.reverse();
        this.categoryItem = this.categoryies;
      });
  }
}
