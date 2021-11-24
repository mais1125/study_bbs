import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { MainComponent } from './pages/main/main.component';
import { ThreadComponent } from './pages/thread/thread.component';

export const PAGE_URI = {
  /** メイン */
  MAIN: '',
  /** カテゴリー */
  CATEGORY: 'category',
  /** スレッド */
  THREAD: 'thread',
} as const;

const routes: Routes = [
  {
    path: PAGE_URI.MAIN,
    component: MainComponent,
  },
  {
    path: PAGE_URI.CATEGORY,
    component: CategoryComponent,
  },
  {
    path: PAGE_URI.THREAD,
    component: ThreadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
