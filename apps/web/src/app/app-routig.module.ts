import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

export const PAGE = {
  /** メイン */
  MAIN: '',
  /** カテゴリー */
  CATEGORY: 'category',
  /** スレッド */
  THREAD: 'thread',
} as const;

const routes: Routes = [
  {
    path: PAGE.MAIN,
    component: MainComponent,
  },
  {
    path: PAGE.CATEGORY,
    loadChildren: () =>
      import('./pages/main/category/category-routing.module').then(
        (m) => m.CategoryRoutingModule
      ),
  },
  {
    path: PAGE.THREAD,
    loadChildren: () =>
      import('./pages/main/thread/tread-routing.module').then(
        (m) => m.ThreadRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
