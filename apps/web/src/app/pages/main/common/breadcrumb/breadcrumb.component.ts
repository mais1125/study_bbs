import { Component, OnDestroy } from '@angular/core';
import { SessionService } from 'apps/web/src/app/service/session.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'project-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnDestroy {
  subscription!: Subscription;
  items: MenuItem[] = [];
  constructor(private sessionService: SessionService) {
    this.subscription = this.sessionService.myBreadCrumbsRec.subscribe(
      (data) => {
        this.items = data;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
