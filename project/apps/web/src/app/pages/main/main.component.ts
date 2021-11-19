import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { API_ENDPOINT } from 'apps/common/interfaces/interface/controller/endpoints.interface';
import { Thread } from 'apps/common/interfaces/interface/entities/thread.interface';

@Component({
  selector: 'project-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  threads: Thread[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    const url = API_ENDPOINT.THREAD_ALL;
    await this.apiService
      .get(url)
      .toPromise()
      .then((i) => {
        this.threads = i as Thread[];
      });
  }
}
