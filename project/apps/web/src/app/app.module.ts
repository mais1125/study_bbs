import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CategoryRoutingModule } from './pages/category/category-routing.module';
import { AppRoutingModule } from './app-routig.module';

import { SidenaviModule } from './pages/common/sidenavi/sidenavi.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SidenaviModule,
    CategoryRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
