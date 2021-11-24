import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routig.module';
import { CategoryRoutingModule } from './pages/category/category-routing.module';
import { ThreadRoutingModule } from './pages/thread/thread-routing.module';

import { SidenaviModule } from './pages/common/sidenavi/sidenavi.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';

const pageRouting = [CategoryRoutingModule, ThreadRoutingModule];

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SidenaviModule,
    ...pageRouting,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
