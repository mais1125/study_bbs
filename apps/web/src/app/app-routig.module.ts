import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './pages/main/category/category.component';
import { MainComponent } from './pages/main/main.component';
import { ThreadComponent } from './pages/main/thread/thread.component';

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
    component: CategoryComponent,
  },
  {
    path: PAGE.THREAD,
    component: ThreadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
