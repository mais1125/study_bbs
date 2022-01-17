import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routig.module';
import { CategoryRoutingModule } from './pages/main/category/category-routing.module';
import { ThreadRoutingModule } from './pages/main/thread/tread-routing.module';

import { SidenaviModule } from './pages/common/sidenavi/sidenavi.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderModule } from './pages/common/header/header.module';
import { BreadcrumbModule } from './pages/main/common/breadcrumb/breadcrumb.module';

const pageRouting = [CategoryRoutingModule, ThreadRoutingModule];
const commonRouting = [SidenaviModule, HeaderModule, BreadcrumbModule];
@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ...pageRouting,
    ...commonRouting,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
