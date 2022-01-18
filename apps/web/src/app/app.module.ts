import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routig.module';

import { SidenaviModule } from './pages/common/sidenavi/sidenavi.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderModule } from './pages/common/header/header.module';
import { BreadcrumbModule } from './pages/main/common/breadcrumb/breadcrumb.module';

const commonRouting = [SidenaviModule, HeaderModule, BreadcrumbModule];
@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...commonRouting,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
