import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE } from '../../../app-routig.module';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'project-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private apiService: ApiService, public router: Router) {}
  /**
   * メインページへ遷移
   */
  main(): void {
    this.router.navigateByUrl(PAGE.MAIN);
  }
}
